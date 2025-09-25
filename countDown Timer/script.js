const endDate=new Date("15 Sep,2025 14:28:00").getTime();
const startDate=new Date().getTime();// ek anchor point hai jahan se tum time track karna start karte ho (page load time).

function updateTimer()
{


    const currentDate=new Date().getTime();// abhi ka waqt, jo har update ke sath change hota hai.
    const distanceCovered= currentDate - startDate;
    const distancePending=endDate - currentDate;

    if(distancePending<=0){
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";

        document.getElementById("timer-message").innerHTML="Time is Up!";

        document.getElementById("progress-bar").style.width="100%"

        clearInterval(timerInterval);
        return;
        
    }

    //caluclting days hrs min sec
    const oneDayinMils=(24 * 60 *60 *1000);
    const oneHoursinMils=(60 * 60* 1000);
    const oneMininMils=(60*1000);
    const oneSecinMils=1000;
    //1day-24 * 60 * 60 * 1000ms
    const days=Math.floor(distancePending/(oneDayinMils)); 
    const hrs=Math.floor((distancePending% (oneDayinMils)/( oneHoursinMils)));
    const mins=Math.floor((distancePending%( oneHoursinMils)/(oneMininMils)));
    const sec=Math.floor((distancePending%(oneMininMils)/(oneSecinMils)));

    //poulate in UI
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("seconds").innerHTML = sec;

    // ..caluclting width percentage 
    const totalDistance=endDate - startDate;
    const percentageDistance= (distanceCovered/totalDistance)*100;

    //set width

    document.getElementById("progress-bar").style.width=percentageDistance+"%";

    
}
const timerInterval=setInterval(updateTimer,1000);
