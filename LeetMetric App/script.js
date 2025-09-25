document.addEventListener("DOMContentLoaded",function(){
    const usernameInput=document.getElementById("user-input");
    const searchButton=document.getElementById("search-button")
    const statsContainer=document.querySelector(".stats-container");
    
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");

    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");

    const cardStatsContainer=document.querySelector(".stats-card");


    //return true/false based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_]{3,15}$/
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("invalid username");
            console.log("UserName is not Valid")
        }
        return isMatching;

    }

    function updateProgress(circle, solved, total)
    {
    if (!circle || total === 0) return;
    const percent = (solved / total) * 100;

    // Update CSS variable for the conic-gradient
    circle.style.setProperty("--progress-degree", `${percent}%`);
    }

    
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent="Searching..."
            searchButton.disabled=true;
            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user details");
            }
            const data= await response.json();
            console.log("Logging Data: ",data);

            easyLabel.textContent=`Easy: ${data.easySolved}/${data.totalEasy}`;
            mediumLabel.textContent=`Medium: ${data.mediumSolved}/${data.totalMedium}`;
            hardLabel.textContent=`Hard: ${data.hardSolved}/${data.totalHard}`;


            updateProgress(easyProgressCircle, data.easySolved, data.totalEasy);
            updateProgress(mediumProgressCircle, data.mediumSolved, data.totalMedium);
            updateProgress(hardProgressCircle, data.hardSolved, data.totalHard);

        }
        catch(error){
        console.error("Error fetching user details:", error);
        }
        finally{
               searchButton.textContent = "Search";
               searchButton.disabled = false;
        }
        
    }

    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("loging username",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})