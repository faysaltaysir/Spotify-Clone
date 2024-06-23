console.log("music app");

let songs = [
    {id: 0,name: "ashique 2",src: "songs/1.mp3", img: "./assets/card1img.jpeg", desc: "Your daily updates of most played ..."},
    {id: 1,name: "Malang",src: "songs/2.mp3", img: "./assets/card2img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 2,name: "rangde basanti",src: "songs/1.mp3", img: "./assets/card3img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 3,name: "ashique 2",src: "songs/2.mp3", img: "./assets/card4img.jpeg", desc: "Your daily updates of most played ..."},
    {id: 4,name: "Malang",src: "songs/1.mp3", img: "./assets/card5img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 5,name: "rangde basanti",src: "songs/2.mp3", img: "./assets/card6img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 6,name: "ashique 2",src: "songs/1.mp3", img: "./assets/card2img.jpeg", desc: "Your daily updates of most played ..."},
    {id: 7,name: "Malang",src: "songs/2.mp3", img: "./assets/card3img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 8,name: "rangde basanti",src: "songs/1.mp3", img: "./assets/card4img.jpeg",desc: "Your daily updates of most played ..."},
    
];
console.log(songs[1]);
for(song of songs){
    console.log(song);   
    let id = song.id; 

    let playlist = document.querySelector(".card-container");

    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id",id);

    let img = document.createElement("img");
    img.classList.add("card-img");
    img.src = song.img;
    img.setAttribute("id",id);
    card.appendChild(img);

    let title = document.createElement("p");
    title.classList.add("heading");
    title.innerText = song.name;
    title.setAttribute("id",id);
    card.appendChild(title);

    let desc = document.createElement("p");
    desc.classList.add("card-about");
    desc.innerText = song.desc;
    card.appendChild(desc);
    desc.setAttribute("id",id);

    console.log(card.id);
    playlist.appendChild(card);
}
let sgn = "";
let card = document.querySelectorAll(".card");
let audioElement;
let playbtn = document.querySelector(".extra");

let musicgif = document.querySelector(".none");
let memo = null;

let myProgress = document.querySelector(".play-progress");

let count = 0;
let finishTime = document.querySelector(".finishTime");
let memoduration;
for(cd of card){
    
    cd.addEventListener("click",async (e)=>{
        if(memo){  //select deselect
            memo.classList.remove("select");
            console.log(memo);
        }
        console.log(memo==e.currentTarget);
        
        if(audioElement){
            // if(memo != e.currentTarget){
                audioElement.pause();
                playbtn.classList.add("fa-circle-play");
                playbtn.classList.remove("fa-circle-pause");
                musicgif.style.opacity = 0;
                
            // }
            // audioElement.pause();
            // e.currentTarget.classList.remove("select");
            // playbtn.classList.add("fa-circle-play");
            // playbtn.classList.remove("fa-circle-pause");
            // musicgif.style.opacity = 0;
            // playbtn.style.opacity = 0;

        }
        console.log(cd);
       
        console.log(e.currentTarget); //current target takes on which the event listener
        sgn = `./${songs[e.target.id].src}`;
        console.log(sgn);
        let playImg = document.querySelector(".music");
        let title = document.querySelector(".title");
        title.innerText = songs[e.target.id].name;
        playImg.src = songs[e.target.id].img;
        console.log(songs[e.target.id].img);
        e.currentTarget.classList.add("select");
        memo = e.currentTarget;
        console.log("audio",audioElement);
        console.log("memo",memo);
        
        
        audioElement = new Audio(sgn);
        // e.currentTarget.classList.add("select");   
        progressUpdate();
        
    });
}





playbtn.addEventListener("click",async ()=>{
    count++;
    if(audioElement.paused ||audioElement.currentTime<=0){
        await audioElement.play();
        console.log(audioElement.duration);
        memoduration = audioElement.duration.toFixed(0);
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
    progressUpdate();
});

let currentTime = document.querySelector(".currentTime");

myProgress.addEventListener('change',async()=> {
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
let progress;
function progressUpdate(){
    audioElement.addEventListener("timeupdate",async()=>{

        let time1 = (audioElement.currentTime).toFixed(0);
        currentTime.innerText = timeConv(time1); 
        let time2 = (audioElement.duration).toFixed(0);
        if(time2 == "NaN")
            time2 = memoduration;     
        finishTime.innerText = timeConv(time2);
        progress = parseInt((time1/time2)*100);
        myProgress.value = progress;
        console.log(time1,time2);
    });
        
}

