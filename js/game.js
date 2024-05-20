// trashArr = [
//     new Trash(this.gameScreen, 0, 50, 80, 100, "./assets/banana-peel.png")
// ]

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.trash = new Trash(
      this.gameScreen,
      0, // top
      50, // left
      80, // width
      90, // height
      "./assets/banana-peel.png"
    );
    this.height = 600;
    this.width = 800;
    this.bin = new Bin(
        this.gameScreen,
        this.height - 90, // top
        50, // left
        110, // width
        120, // height
        "./assets/blue-bin.png"
    );
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    // this.startScreen.style.display = "none";
    // this.gameScreen.style.display = "show";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    // console.log("inside the game loop");
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    // console.log("inside the update function");
    this.trash.move();

    // this checks if the top of trash element is bigger (on the bottom) than the game page
    if (this.trash.top > this.height - this.trash.height / 2) {
      // 600 // this.gameScreen.width ?
      // this.obstacles.splice(oneObstacleIndex, 1);
      this.trash.element.remove();
      // and increase score by 1
      this.lives -= 1;
      const livesElement = document.getElementById("lives"); // always update the DOM with the new score
      livesElement.innerText = this.lives;
      // this.obstacles.push(new Obstacle(this.gameScreen));
    }

    // if trash toches bin
    const wasCollected = this.trash.wasCollectedBy(this.bin);
    if (wasCollected) {
      // this.bins.splice(binIndex, 1);
      this.trash.element.remove();
      // this.bins.push(new Bin(this.gameScreen));
      this.score += 1;
      const scoreElement = document.getElementById("score");
      scoreElement.innerText = this.score;
    }

    // Avoid trash to go off screen borders
    if (this.trash.top === this.height) { // ???????
        // this.trash.directionX = 0;
        // this.trash.directionY = 0;
    }

    // this.bins.forEach((bin, binIndex) => {
    //     bin.move();

    //     // if trash toches bin
    //     const wasCollected = this.trash.wasCollectedBy(bin);
    //     if (thereWasACollision) {
    //         this.bins.splice(binIndex, 1);
    //         bin.element.remove();
    //         this.bins.push(new Bin(this.gameScreen));
    //         this.lives += 1;
    //         if (this.lives === 0) {
    //             this.isGameOver = true;
    //         }
    //         const livesElement = document.getElementById("lives");
    //         livesElement.innerText = this.lives;
    //     }

    //     // wrap in a function
    //     // this checks if the top of trash element is bigger (on the bottom) than the game page
    //     if (oneObstacle.top > 700){ // this.gameScreen.width ?
    //         this.obstacles.splice(oneObstacleIndex, 1)
    //         oneObstacle.element.remove();
    //         // and increase score by 1
    //         this.score += 1;
    //         // always update the DOM with the new score
    //         const scoreElement = document.getElementById("score");
    //         scoreElement.innerText = this.score;
    //         this.obstacles.push(new Obstacle(this.gameScreen))
    //     }
    // })
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
