

const soldiers = [
    {
      fullName: "david devi",
      rank: "Sergeant",
      position: "Sniper",
      platoon: "A",
      status: "Active",
      missionTime: 1
    },
    {
      fullName: "moshe cohen",
      rank: "Lieutenant",
      position: "Commander",
      platoon: "B",
      status: "Reserve",
      missionTime: 3
    },
    {
      fullName: "avi shalom",
      rank: "Private",
      position: "Rifleman",
      platoon: "C",
      status: "Active",
      missionTime: 1.5
    },
    {
      fullName: "yossi shalom",
      rank: "Captain",
      position: "Engineer",
      platoon: "A",
      status: "Retired",
      missionTime: 2
    },
    {
      fullName: "itamar lavan",
      rank: "Corporal",
      position: "Medic",
      platoon: "B",
      status: "Active",
      missionTime: 6
    }
  ];

let flag = 0;
let loadtable = (arr)=>{
  console.log(arr);
  
  const  table = document.querySelector(".table-person")
  table.innerHTML = "";
  arr.forEach(element => {
    let newdiv= retnewslg(element)
    table.appendChild(newdiv);
  });
  localStorage.setItem("soldierslist", JSON.stringify(arr));
}

let retnewslg = (slg)=>{
  let newperson = document.createElement("div");
  newperson.className = "categories person";
  for (const property in slg) {
    if(property =="missionTime")
    {      
        let hidep = document.createElement("p")
        property.id = "time-person";
        hidep.textContent = slg[property];
        hidep.style.display = "none"
        newperson.appendChild(hidep);      
    }
    else{
    let newctg= document.createElement("div");
    newctg.className =(property !="fullName")? "category person":"category person person-name";
    let newp = document.createElement("p")
    newp.textContent =slg[ property];
    newctg.appendChild(newp);
    newperson.appendChild(newctg);
    }
  }
  let actionsdiv = document.createElement("div");
  actionsdiv.className = "category person action-area";
  actionsdiv.id = "actions";
  let rembtn = document.createElement("button");
  rembtn.className =  "actions-btn remove";
  rembtn.textContent = "Remove"
  rembtn.addEventListener("click",()=>{
    let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
    const namediv = document.querySelector(".person-name")
    let sldname = namediv.textContent;    
    const index = arrsoldiers.findIndex(obj => obj.fullName === sldname);  
    arrsoldiers.splice(index,1)
    localStorage.clear();
    window.localStorage.setItem("soldierslist",JSON.stringify(arrsoldiers));

    loadtable(arrsoldiers)
  })
  let msnbtn = document.createElement("button");
  msnbtn.className =  "actions-btn mission";
  msnbtn.textContent ="mission"
  msnbtn.addEventListener("click",()=>{
    let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
    const namediv2 = document.querySelector(".person-name")
    let sldname2 = slg["fullName"];    
    const index = arrsoldiers.findIndex(obj => obj.fullName === sldname2);  
    let missionTime = arrsoldiers[index].missionTime;
    const interval = setInterval(() => {
        const remainingSeconds = missionTime % 60;
        msnbtn.textContent = `${missionTime}`
        console.log(`${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
        
        if (missionTime <= 0) {
            clearInterval(interval);
            msnbtn.textContent = "mission completed"
            console.log("Time's up!");
        }
        missionTime--;
    }, 1000);
    console.log(missionTime);
    
    
  })
  let editmbtn = document.createElement("button");
  editmbtn.className =  "actions-btn edit";
  editmbtn.textContent = "edit"
  editmbtn.addEventListener("click",()=>{
    const heder = document.querySelector(".heder");
    heder.textContent = "EDIT PERSONNEL";
    const contentadd =document.querySelector(".content-add")
    contentadd.style.display = "none"
    const contenttable = document.querySelector(".content-table");
    contenttable.style.display = "none";
    const editfrm = document.querySelector(".edit-frm");
    editfrm.style.display = "flex"
    let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
    let sldname2 = slg["fullName"];    
    const index = arrsoldiers.findIndex(obj => obj.fullName === sldname2); 
    document.querySelector(".nameedit").value = arrsoldiers[index].fullName;
    document.querySelector(".rankedit").value = arrsoldiers[index].rank;
    document.querySelector(".positionedit").value = arrsoldiers[index].position;
    document.querySelector(".platoonedit").value = arrsoldiers[index].platoon;
    document.querySelector(".missionTimeedit").value = arrsoldiers[index].missionTime;

  })
  actionsdiv.appendChild(rembtn);
  actionsdiv.appendChild(msnbtn);
  actionsdiv.appendChild(editmbtn);
  newperson.appendChild(actionsdiv);
  return newperson;
}

loadtable(soldiers)



let addslg = (newslg)=>{
  let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
  arrsoldiers.push(newslg);
  localStorage.setItem("soldierslist",JSON.stringify(arrsoldiers));
  loadtable(arrsoldiers)
}

document.querySelector("#btn-add-slg").addEventListener("click", () => {
 
  let name = document.querySelector(".name").value;
  let rank = document.querySelector(".rank").value;
  let position = document.querySelector(".position").value;
  let platoon = document.querySelector(".platoon").value;
  let missionTime = document.querySelector(".missionTime").value;
  let status = document.querySelector("select").value;

  let newSoldier = {
    fullName: name,
    rank: rank,
    position: position,
    platoon: platoon,
    status: status,
    missionTime: parseFloat(missionTime)
  };
  console.log(newSoldier);
  
  addslg(newSoldier);
  
  document.querySelectorAll('.npt-frm').forEach(input => input.value = '');
});

document.querySelector("#btn-ctg").addEventListener("click",()=>{
  let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
  if(flag == 0){
    loadtable(arrsoldiers.sort((a, b) => a.fullName.localeCompare(b.fullName)))
    flag = 1;
    return;
    }
    else{
      loadtable(arrsoldiers.sort((a, b) => a.fullName.localeCompare(b.fullName)).reverse())
      flag = 0;
    }
})


document.querySelector(".green-btn-frm").addEventListener("click",()=>{
  console.log("fhs");
  
  let name = document.querySelector(".nameedit").value;
  let rank = document.querySelector(".rankedit").value;
  let position = document.querySelector(".positionedit").value;
  let platoon = document.querySelector(".platoonedit").value;
  let missionTime = document.querySelector(".missionTimeedit").value;
  let status = document.querySelector("selectedit").value;
  let arrsoldiers = JSON.parse( localStorage.getItem("soldierslist"));
  const index = arrsoldiers.findIndex(obj => obj.fullName === name); 
  let newSoldier = {
    fullName: name,
    rank: rank,
    position: position,
    platoon: platoon,
    status: status,
    missionTime: parseFloat(missionTime)
  }; 
  arrsoldiers[index] = newSoldier
  localStorage.setItem("soldierslist",JSON.stringify( arrsoldiers));
  const heder = document.querySelector(".heder");
  heder.textContent = "BATTALION FORCE MANGEMENT";
  const contentadd =document.querySelector(".content-add")
  contentadd.style.display = "flex"
  const contenttable = document.querySelector(".content-table");
  contenttable.style.display = "flex";
  const editfrm = document.querySelector(".edit-frm");
  editfrm.style.display = "none"
  loadtable(arrsoldiers);
});

