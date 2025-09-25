const input=document.getElementById('input-text');
const ul=document.getElementById('list');
const checkbox=document.querySelectorAll(".checkbox");

const emptyMsg = document.getElementById('empty-msg');// "No tasks yet" msg

// function to check if list is empty
function checkEmptyList() {
    if (ul.children.length === 0) {
        emptyMsg.style.display = "block";  // show msg
    } else {
        emptyMsg.style.display = "none";   // hide msg
    }
}


function takingInput(event){
     event.preventDefault();
    if(event.key==="Enter" && input.value===""){
        alert("Please Enter a task");
        return false;
    }
    else if(event.key==="Enter")
    {
        if(ul.children.length>=6){
            alert("You can add upto 6 task!")
            input.value="";
            return;
        }
        
        let inp=document.createElement('li');
        inp.className="lists";
        inp.appendChild(document.createTextNode(input.value));

        
        let taskContent = document.createElement("div");
        taskContent.style.display = "flex";
        taskContent.style.flexDirection = "column";
        
        let taskDate=document.createElement("small");
        let now=new Date();
        taskDate.textContent=now.toLocaleDateString();
        taskDate.style.color="gray";
        taskDate.style.fontSize="0.8rem";
        taskContent.appendChild(taskDate);

        inp.appendChild(taskContent);

        let check=document.createElement("input");
        check.type="checkbox";
        check.className="check-box";
        inp.appendChild(check);

        check.addEventListener("change",function(){
            if(this.checked){
                inp.classList.add("completed");
            }
            else
            {
                inp.classList.remove("completed");
            }
        });

      
        ul.appendChild(inp);
        
        let storeTask=input.value;
        console.log("Task Store: "+ storeTask);
        input.value="";
    }
    
    


 
}

input.addEventListener('keyup',takingInput);

