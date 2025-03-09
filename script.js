let dataArray = []; 

function addItem() {
    let userInput = prompt("กรุณากรอกข้อมูล:");
    if (userInput !== null && userInput !== "") {
        dataArray.push(userInput); 
        updateList();
    }
}

function updateList() {
    let listElement = document.getElementById("list");
    listElement.innerHTML = ""; 
    
    dataArray.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        listElement.appendChild(li);
    });
}