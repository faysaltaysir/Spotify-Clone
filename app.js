console.log("music app");

let songs = [
    {id: 0,name: "ashique 2",src: "songs/1.mp3", img: "./assets/card2img.jpeg", desc: "Your daily updates of most played ..."},
    {id: 1,name: "Malang",src: "songs/2.mp3", img: "./assets/card3img.jpeg",desc: "Your daily updates of most played ..."},
    {id: 2,name: "rangde basanti",src: "songs/3.mp3", img: "./assets/card4img.jpeg",desc: "Your daily updates of most played ..."},
    // {name: "ashique ban aya",src: "songs/4.mp3", img: "songs/4.jpg",desc: "Your daily updates of most played ..."},
    // {name: "ashique ban aya",src: "songs/4.mp3", img: "songs/4.jpg",desc: "Your daily updates of most played ..."}
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
let audioElement = null;
let playbtn = document.querySelector(".extra");

let musicgif = document.querySelector(".none");
for(cd of card){
    cd.addEventListener("click",async (e)=>{
        // let sel = document.querySelectorAll(".select");
        // for(e of sel){
        //     e.classList.remove("select");
        // }
        console.log(e.currentTarget); //current target takes on which the event listener
        sgn = `./${songs[e.target.id].src}`;
        console.log(sgn);
        let playImg = document.querySelector(".music");
        let title = document.querySelector(".title");
        title.innerText = songs[e.target.id].name;
        playImg.src = songs[e.target.id].img;
        console.log(songs[e.target.id].img);
        if(audioElement){
            audioElement.pause();
            // e.currentTarget.classList.remove("select");
            playbtn.classList.add("fa-circle-play");
            playbtn.classList.remove("fa-circle-pause");
            musicgif.style.opacity = 0;
            // playbtn.style.opacity = 0;

        }

         
        audioElement = new Audio(sgn);
        // e.currentTarget.classList.add("select");   
        
    });
}




let myProgress = document.querySelector(".play-progress");

let count = 0;

playbtn.addEventListener("click",async ()=>{
    count++;
    if(audioElement.paused ||audioElement.currentTime<=0){
        await audioElement.play();
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


