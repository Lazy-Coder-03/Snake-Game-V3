let snake;
let food;
let bonusFood;
let scl;
let score = 0;
let highScore = 0;
let gameOver = false;
let showGrid = true;
let foodCount = 0;
let bgm;
let eatf;
let eatbf;
let sounds = [];
let playbgmusic = true;
let playsound = true;
let wall = true;
let gameRunning = false;
let windowScaleFac=30;//higher is smaller
function preload() {
  bgm = loadSound("soundsmp3/bgmusic.mp3");
  eatf = loadSound("soundsmp3/eat.mp3");
  eatbf = loadSound("soundsmp3/bonuseat.mp3");
  for (let i = 97; i <= 110; i++) {
    let soundFile = "soundsmp3/" + String.fromCharCode(i) + ".mp3";
    sounds.push(loadSound(soundFile))
  }
}

function setup() {
  scl=min(floor(windowHeight/windowScaleFac),floor(windowWidth/windowScaleFac));
  createCanvas(scl * 20, scl * 20);
  frameRate(10);
  if (playbgmusic) {
    bgmPlay();
  } else {
    bgm.stop();
  }
}

function eatfsound() {
  let ind = foodCount % sounds.length;
  sounds[ind].setVolume(0.3);
  sounds[ind].play();
}

function bgmPlay() {
  bgm.setVolume(0.1)
  bgm.play();
  bgm.loop();

}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  const highScoreElement = document.getElementById("high-score");
  highScoreElement.innerHTML = `High Score: ${highScore}`;
}


function loadHighScore() {
  highScore = localStorage.getItem("highScore") || 0;
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.innerHTML = `Score: ${score}`;
}

const toggleGridButton = document.getElementById("toggle-grid-button");
const toggleMusicButton = document.getElementById("music-toggle-button");
const toggleSoundButton = document.getElementById("sound-toggle-button");
const toggleWallButton = document.getElementById("toggle-wall-button");
const startButton = document.getElementById("start-button");


toggleGridButton.addEventListener("click", () => {
  if (!gameRunning) {
    showGrid = !showGrid;
    toggleGridButton.classList.toggle("toggle-on");
  }
});


toggleMusicButton.addEventListener("click", () => {
  playbgmusic = !playbgmusic;
  toggleMusicButton.classList.toggle("toggle-on");
  if (playbgmusic) {
    bgmPlay();
  } else {
    bgm.stop();
  }
});

toggleSoundButton.addEventListener("click", () => {
  toggleSoundButton.classList.toggle("toggle-on");
  playsound = !playsound;
});

toggleWallButton.addEventListener("click", () => {
  if (!gameRunning) {
    toggleWallButton.classList.toggle("toggle-on");
    wall = !wall;
  }
});



startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  startGame();
});

function draw() {
  background(51);

  if (!gameRunning) {
    fill(255);
    textSize(width*1/20);
    textAlign(LEFT)
    textStyle(BOLD);
    text("Rules :", width/30, height/10)
    textSize(width*1/27);
    textStyle(NORMAL);
    text("1) This is a Classic game of Snake Where your goal is to score the HIGHEST !!!", width/30, height/15,width-25,height/4)
    text("2) You will lose the game if you run into yourself or run into the wall when Wall option is toggled", width/30, height/6,width-25,height/4)
    text("3) You can only toggle the grid and wall option when the game is not running, the music and sounds can be toggled any time", width/30, height/3.5,width-25,height/4)
    textSize(width*1/10);
    fill("gold")
    textAlign(CENTER, CENTER);
    text("HAVE FUN!!!", width / 2, height*(2/3))
    //noLoop();
    return;
  }
  else {
    //grid

    if (showGrid) {
      for (let i = 1; i < width; i += 1) {
        strokeWeight(0.5)
        stroke("#00BCD4")
        line(i * scl, 0, i * scl, height)
      }
      for (let i = 1; i < height; i += 1) {
        strokeWeight(0.5)
        stroke("#00BCD4")
        line(0, i * scl, width, i * scl)
      }
    }
    //wall
    if (wall){
      push()
      stroke(255, 76, 90)
      strokeWeight(5)
      line(0,0,width,0)
      line(0,0,0,height)
      line(0,height,width,height)
      line(width,0,width,height)
      pop()
    }

    snake.update();
    snake.show();
    if (snake.eat(food, "normal")) {
      foodCount++;
      if (foodCount % 5 === 0) {
        // every 5th food is a bonus food
        bonusFood = new BonusFood();
        food = new Food();
      } else {
        food = new Food();
      }
    }
    food.show();
    if (bonusFood) {
      bonusFood.show();
      bonusFood.update();
    }
    updateHighScore();
    updateScore();
    if (gameOver) {

      if (confirm("Game over. Do you want to restart?")) {
        startGame()
      }
      else {
        gameRunning = false;
        score=0;
        updateScore();
        document.getElementById("start-button").style.display = "block"
      }
    }
  }
}

function startGame() {
  snake = new Snake();
  food = new Food();
  bonusFood = null;
  gameOver = false;
  score = 0;
  foodCount = 0;
  gameRunning = true;
}

function keyPressed() {
  // handle keyboard input
  if (keyCode === UP_ARROW && snake.yv !== 1) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.yv !== -1) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xv !== 1) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xv !== -1) {
    snake.dir(1, 0);
  }
}
