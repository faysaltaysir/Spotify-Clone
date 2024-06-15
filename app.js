console.log("music app");

let audioElement = new Audio('./assets/song1.mp3');
let myProgress = document.querySelector(".play-progress");

let musicgif = document.querySelector(".none");
let count = 0;
let playbtn = document.querySelector(".extra");
playbtn.addEventListener("click",()=>{
    count++;
    if(audioElement.paused ||audioElement.currentTime<=0){
        audioElement.play();
        playbtn.classList.remove("fa-circle-play");
        playbtn.classList.add("fa-circle-pause");
        musicgif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        playbtn.classList.remove("fa-circle-pause");
        playbtn.classList.add("fa-circle-play");
        musicgif.style.opacity = 0;
    }
});

let currentTime = document.querySelector(".currentTime");
let finishTime = document.querySelector(".finishTime");
myProgress.addEventListener('change',()=>{
    audioElement.currentTime = (myProgress.value/100)*audioElement.duration;
    console.log(audioElement.currentTime);
});
function timeConv(time){
    let timeM = Math.floor(time/60);
    let timeS = (time%60);
    let timeString;
    if(timeS>9){
        timeString = `${timeM}:${timeS}`;
    }
    else{
        timeString = `${timeM}:0${timeS}`;
    }
    return timeString;
}
audioElement.addEventListener("timeupdate",()=>{
    let time1 = (audioElement.currentTime).toFixed(0);
    currentTime.innerText = timeConv(time1); 
    let time2 = (audioElement.duration).toFixed(0);
    finishTime.innerText = timeConv(time2);
    let progress = parseInt((time1/time2)*100);
    myProgress.value = progress;
});


