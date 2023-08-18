// Game Constants & Variables
const startGame=document.getElementById("startGame");
const mainContainer=document.querySelector('.body');
const infoContainer=document.getElementById('intro_Page');

let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const congMusic=new Audio('music/Congratulations.mp3');
let speed =5;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 10}
];
food = {x: 25, y: 32};

// Game Functions:main function: ctime-currentTime in second
function main(ctime) {
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed){
      return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isSnakeCollide(snake) {
  // If Snake bump into yourself 
  for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
      }
  }
  // If Snake bump into the wall
  if(snake[0].x >= 36 || snake[0].x <=0 || snake[0].y >= 36 || snake[0].y <=0){
      return true;
  }
      
  return false;
}

function isHighScore(){
    hiscore=parseInt(hiscore);
    if(score>hiscore){
        const body=document.querySelector(".body");
        let name=prompt("Enter Your Name");
        congMusic.play();
        body.innerHTML=
        `
        <div 
            style="
            display:flex;
            flex-direction:column-reverse
        ">
            <h1 style="
            color:cyan;
            font-size:64px">
            Hi,${name}<br>Congralutions<br>You Are the Higher Scorer.
            </h1>
            <img style="width:800px;height:500px" src="congrats-7.gif">
        </div>
        `
    }else{
        const result=alert("Game Over. Press any key to play again!");
        if(!result){
            musicSound.play();
        }
    }
}

function speedInc(snakeLen){
    if(snakeLen%3===0){
        speed+=2;
    }
}
function gameEngine(){
  // 1.update the snake and food
  // (i)When snake is collide iteself ya with wall
  if(isSnakeCollide(snakeArr)){
      gameOverSound.play();
      musicSound.pause();
      isHighScore();
      inputDir =  {x: 0, y: 0}; 
      snakeArr = [{x: 13, y: 15}];
      score=0;
      scoreBox.innerHTML="Your Score :"+score;
      
  }

// When snake will eat the food then we have to increment in score and regenerate the food
  if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    speedInc(snakeArr.length);
    score+=1;
    if(score>hiscoreval){
        // const hiscoreBox=document.querySelector("#hiscoreBox");
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML="Hi Score :"+hiscoreval;
    }
    scoreBox.innerHTML="Your Score :"+score;
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 32;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
}

// For Moving the snake:-Replace last snakeArr element by secondLast snakearr element,secondLast snakeArr element by thirdLast snakearr element and so on..... 
for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

// 2. Display the snake and food:-snake is type of array because if snake will eat then 1 food will added with him and food is like an object
// (i).Display the snake
    const board=document.querySelector(".board");
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // (ii)Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// 2.Main logic start here.
document.body.addEventListener('click',()=>{
    musicSound.play();
})

// For High Score
// First,we will create 'hiscore' variable and put into local storage 
let hiscore=localStorage.getItem('hiscore');           //hiscore=0
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hi Score :"+hiscoreval;
}
//In gaming,looping is very important.For looping,we can use setInterval() also but here we are using window.requestAnimationFrame(function) because it works more faster.

startGame.addEventListener('click',()=>{
    window.requestAnimationFrame(main); 
    infoContainer.style.display="none";
    mainContainer.style.display="flex";  
})

// window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
