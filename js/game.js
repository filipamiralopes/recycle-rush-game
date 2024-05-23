class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.trashSpeed = 2;
    this.trashArr = [new Trash(this.gameScreen, this.trashSpeed)];
    this.height = 600;
    this.width = 900;
    this.bins = [
      new blueBin(this.gameScreen, 10),
      new yellowBin(this.gameScreen, 255),
      new greenBin(this.gameScreen, 525),
      new brownBin(this.gameScreen, 790),
    ];
    this.score = 0;
    this.lives = 5;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.speed = 7;
    this.ambientMusic = new Audio("./assets/audio/sims-heartbeat.mp3");
    this.ambientMusic.volume = 0.1;

    this.livesElement = document.getElementById("lives");
  }

  start() {
    this.ambientMusic.play();
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";

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
        // add poop on the floor
        this._poop(trash);
        this._youLoose(trash, i);
      }

      // if trash toches the bin
      const blueBin = this.bins.filter((bin) => bin.type === "paper")[0];
      const yellowBin = this.bins.filter((bin) => bin.type === "plastic")[0];
      const greenBin = this.bins.filter((bin) => bin.type === "glass")[0];
      const brownBin = this.bins.filter((bin) => bin.type === "organic")[0];

      const paperWasCollected = trash.wasCollectedRightBy(blueBin);
      const plasticWasCollected = trash.wasCollectedRightBy(yellowBin);
      const glassWasCollected = trash.wasCollectedRightBy(greenBin);
      const foodWasCollected = trash.wasCollectedRightBy(brownBin);

      const itsNotPaper = trash.wasCollectedWrongBy(blueBin);
      const itsNotPlastic = trash.wasCollectedWrongBy(yellowBin);
      const itsNotGlass = trash.wasCollectedWrongBy(greenBin);
      const itsNotFood = trash.wasCollectedWrongBy(brownBin);

      if (
        paperWasCollected ||
        plasticWasCollected ||
        glassWasCollected ||
        foodWasCollected
      ) {
        this.trashArr.splice(i, 1);
        //trash.element.remove(); // removed by CSS
        const scoreElement = document.getElementById("score");
        this.score += 1;
        if (this.score %3 !== 0){
          this.bins[0].yeahSound.play();
        }
        if (this.score % 2 === 0) {
          this.shuffleBins();
        }
        if (this.score % 3 === 0) {
          const levelUpSound = new Audio("./assets/audio/level-up.wav")
          levelUpSound.volume = 0.2;
          levelUpSound.play()
          this.trashSpeed += 1;
        }
        this.trashArr.push(new Trash(this.gameScreen, this.trashSpeed));
        scoreElement.innerText = this.score;
      } else if (itsNotPaper || itsNotPlastic || itsNotGlass || itsNotFood) {
        if (this.lives > 1) {
          blueBin.nopeSound.play();
        }
        this._youLoose(trash, i);
      }
    });
  }

  shuffleBins() {
    this.bins.forEach((bin) => bin.element.remove());
    const newPositions = this._shuffleArr([10, 255, 525, 790]);
    this.bins = [
      new blueBin(this.gameScreen, newPositions[0]),
      new yellowBin(this.gameScreen, newPositions[1]),
      new greenBin(this.gameScreen, newPositions[2]),
      new brownBin(this.gameScreen, newPositions[3]),
    ];
  }

  displayHearts() {
    const livesLost = 5 - this.lives;
    this.livesElement.innerText = "";
    for (let i = 0; i < this.lives; i++) {
      const heartElement = document.createElement("img");
      heartElement.setAttribute("src", "./assets/recycle-symbol.png");
      heartElement.setAttribute("class", "hearts");
      this.livesElement.appendChild(heartElement);
    }
    for (let i = 0; i < livesLost; i++) {
      const heartElement = document.createElement("img");
      heartElement.setAttribute("src", "./assets/red-cross.png");
      heartElement.setAttribute("class", "hearts");
      this.livesElement.appendChild(heartElement);
    }
  }

  gameOver() {
    this.ambientMusic.pause();
    const gameOverSound = new Audio("./assets/audio/game-over.mp3");
    gameOverSound.volume = 0.1;
    gameOverSound.play();

    this.gameContainer.style.display = "none";
    this.gameEndScreen.style.display = "block";

    const didYouKnows = [
      {
        src: "./assets/ocean-pollution.jpeg",
        text: `the largest dumping site of plastics is not a landfill,\n it is the Pacific ocean?`,
      },
      {
        src: "./assets/plastic-waste.jpeg",
        text: `enough plastic bottles are discarded over a year\n to go around the planet 4 times?`,
      },
      {
        src: "./assets/pizza-box.jpeg",
        text: `dirty paper, like your greazy pizza box bottom,\n can't be recycled?`,
      },
      {
        src: "./assets/blue-whale-tail.jpg",
        text: `more than 52 million tons of paper were recycled in 2018?\n - same weight as almost 350,000 blue whales.`,
      },
      {
        src: "./assets/recycle-glass.jpeg",
        text: `recycling glass is great because it can be recycled endlessly\n with no loss in quality or purity?`,
      },
    ];
    const didYouKnowsShuffled = this._shuffleArr(didYouKnows);
    const didYouNKnowElement = document.getElementById("did-you-know");
    const factImageElement = document.getElementById("fact-img");
    didYouNKnowElement.innerText = didYouKnowsShuffled[0].text;
    factImageElement.src = didYouKnowsShuffled[0].src;
  }

  _youLoose(trash, i) {
    this.trashArr.splice(i, 1);
    trash.element.remove();
    this.lives -= 1;
    if (this.lives === 0) {
      this.isGameOver = true;
    }
    // const livesElement = document.getElementById("lives");
    // livesElement.innerText = this.lives;
    this.displayHearts() 

    this.trashArr.push(new Trash(this.gameScreen, this.trashSpeed));
  }

  _poop(trash) {
    const poopElement = document.createElement("img");
    poopElement.src = "./assets/poop.png";
    poopElement.style.position = "absolute";
    poopElement.style.top = `${this.height - 30}px`;
    poopElement.style.left = trash.element.style.left;
    poopElement.style.height = "4vw";
    poopElement.style.width = "4vw";
    this.gameScreen.appendChild(poopElement);
    if (this.lives > 1) {
      trash.poopSound.play();
    }
  }

  _shuffleArr(arr) {
    const randomizedArr = [];
    let counter = arr.length;
    while (counter > 0) {
      let randomElement = arr[Math.floor(Math.random() * arr.length)];
      if (!randomizedArr.includes(randomElement)) {
        randomizedArr.push(randomElement);
        counter -= 1;
      }
    }
    return randomizedArr;
  }
}
