document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        game('Rock');
    }else if(event.key==='p'){
        game('Paper');
    }else if(event.key==='s'){
        game('Scissors')
    }else if(event.key==='a'){
        autoPlay();
    }else if(event.key==='Backspace'){
        document.querySelector('.usure').innerHTML=`Are you sure you want to reset? 
        <button class="Auto" onclick="
        score.Lose=0;
        score.Tie=0;
        score.Win=0;
        playingPower.playPowerLevel=1;
        playingPower.playPowerCost=30;
        playingPower.playPower=1;
        autoPlayingPower.autoPlayLevel=1;
        autoPlayingPower.autoPlayCost=10;
        autoPlayingPower.timeTaken=10000;
        localStorage.removeItem('score');
        localStorage.removeItem('playingpower');
        localStorage.removeItem('autoplayingpower');
        scoreUpdate();
        playPowerLevelUpdate();
        autoPLayLevelUpdate();
        document.querySelector('.usure').innerHTML=''">Yes</button>
        <button class="Auto" onclick="
        document.querySelector('.usure').innerHTML=''
        ">No</button>`
    }
})
let playingPower = JSON.parse(localStorage.getItem('playingpower'))||{
    playPowerLevel:1,
    playPowerCost:30,
    playPower:1
}
console.log(playingPower)
let autoPlayingPower = JSON.parse(localStorage.getItem('autoplayingpower'))||{
    autoPlayLevel:1,
    autoPlayCost:10,
    timeTaken:10000
}
console.log(autoPlayingPower)
let score=JSON.parse(localStorage.getItem('score'))||{
    Win:0,
    Lose:0,
    Tie:0
};
scoreUpdate();
function scoreUpdate () {
    document.querySelector('.scores').innerHTML=`Win:${score.Win} Lose:${score.Lose} Tie:${score.Tie}`;
}
function autoPLayLevelUpdate(){
    document.querySelector('.level').innerHTML=`LV.${autoPlayingPower.autoPlayLevel} Cost:${autoPlayingPower.autoPlayCost} wins`;
}
function playPowerLevelUpdate(){
    document.querySelector('.power-level').innerHTML=`LV.${playingPower.playPowerLevel} Cost:${playingPower.playPowerCost} wins`;
}


function upgradeAutoPlay(){
if(score.Win>=autoPlayingPower.autoPlayCost){
autoPlayingPower.autoPlayLevel++;
score.Win-=autoPlayingPower.autoPlayCost;
autoPlayingPower.autoPlayCost=Math.round(autoPlayingPower.autoPlayCost*1.5);
autoPlayingPower.timeTaken-=500
autoPLayLevelUpdate();
console.log(autoPlayingPower.timeTaken);
localStorage.setItem('autoplayingpower',JSON.stringify(autoPlayingPower));
localStorage.setItem('score',JSON.stringify(score));
scoreUpdate();
}
}
autoPLayLevelUpdate();
function upgradePlayingPower(){
    if(score.Win>=playingPower.playPowerCost){
        playingPower.playPowerLevel++;
        score.Win-=playingPower.playPowerCost;
        playingPower.playPowerCost=Math.round(playingPower.playPowerCost*2.25);
        playingPower.playPower*=2;
        playPowerLevelUpdate();
    localStorage.setItem('score',JSON.stringify(score));
    localStorage.setItem('playingpower',JSON.stringify(playingPower));
    scoreUpdate();
}
}
playPowerLevelUpdate();
let autoPlaying = false;
let interval;
function autoPlay(){
    if(!autoPlaying){
        interval =setInterval(()=>{let playMove=cMove();
            game(playMove);},autoPlayingPower.timeTaken);
            autoPlaying=true;
            document.querySelector('.Auto').innerHTML='Stop playing';
    }else{
        clearInterval(interval);
        autoPlaying=false;
        document.querySelector('.Auto').innerHTML='Auto play';
    }
}
    function cMove () {
        let o = Math.random();
if(o >= 0 && o < 1/3) {
    m ='Rock';
} else if(o >= 1/3 && o < 2/3) {
    m ='Paper';
}else if(o >=2/3 && o < 1) {
    m ='Scissors';
}
return m;
    }
    function game(move){
        const m = cMove();
        let r ='';
if(move === 'Scissors'){
        if(m==='Rock'){
    r='You lose.';
    score.Lose+=1;
}else if (m==='Paper'){
    r='You win.';
    score.Win+=playingPower.playPower;
}else if(m==='Scissors'){
    r='Tie.';
    score.Tie+=1;
}
} else if(move === 'Rock'){
if(m==='Rock'){
    r='Tie.';
    score.Tie+=1;
}else if (m==='Paper'){
    r='You lose.';
    score.Lose+=1;
}else if(m==='Scissors'){
    r='You win.';
    score.Win+=playingPower.playPower;
}
} else if(move === 'Paper'){
if(m==='Rock'){
    r='You win.';
    score.Win+=playingPower.playPower;
}else if (m==='Paper'){
    r='Tie.';
    score.Tie+=1;
}else if(m==='Scissors'){
    r='You lose.';
    score.Lose+=1;
}

}
localStorage.setItem('score',JSON.stringify(score));
scoreUpdate();
document.querySelector('.results').innerHTML=r;
document.querySelector('.move').innerHTML=`You <img class="icon" src="images/${move}-emoji.png"> <img class="icon" src="images/${m}-emoji.png"> Computer`
}