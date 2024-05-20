class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.trashArr = [new Trash(this.gameScreen)];
    this.height = 600;
    this.width = 800;
    this.bins = [
      new Bin(
        this.gameScreen,
        this.height - 90, // top
        50, // left
        110, // width
        120, // height
        "paper",
        "./assets/blue-bin.png"
      ),
    ];
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
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    this.trashArr.forEach((trash, i) => {
      trash.move();

      // if trash toches the floor
      if (trash.top > this.height - trash.height / 2) {
        this.trashArr.splice(i, 1);
        trash.element.remove();
        this.lives -= 1;
        if (this.lives === 0) {
          this.isGameOver = true;
        }
        const livesElement = document.getElementById("lives"); // always update the DOM with the new score
        livesElement.innerText = this.lives;
        this.trashArr.push(new Trash(this.gameScreen));
      }

      // if trash toches the bin
      const wasCollected = trash.wasCollectedBy(this.bins[0]);
      if (wasCollected) {
        this.trashArr.splice(i, 1);
        trash.element.remove();
        this.score += 1;
        const scoreElement = document.getElementById("score");
        this.trashArr.push(new Trash(this.gameScreen));
        scoreElement.innerText = this.score;
      }

      //   // Avoid trash to go off screen borders
      //   if (this.trash.top === this.height) {
      //     // ???????
      //     // this.trash.directionX = 0;
      //     // this.trash.directionY = 0;
      //   }
    });
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
