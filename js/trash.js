class Trash {
  constructor(gameScreen, speed) {
    const randomTrash = this.getRandomTrash();

    this.gameScreen = gameScreen;
    this.top = 0;
    this.left = Math.floor(Math.random() * (700 - 20 + 1)) + 20;
    this.width = randomTrash.width;
    this.height = randomTrash.height;
    this.directionX = 0;
    this.directionY = 0;

    this.type = randomTrash.type;
    this.speed = speed;

    this.element = document.createElement("img");
    this.element.src = randomTrash.src;

    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.poopSound = new Audio("./assets/audio/fart.wav");
    this.poopSound.volume = 0.1;

    this.gameScreen.appendChild(this.element);
  }

  getRandomTrash() {
    const trashAssets = [
      { src: "./assets/banana-peel.png", type: "organic", width: 80, height: 100 },
      { src: "./assets/beer-bottle.png", type: "glass", width: 80, height: 100 },
      { src: "./assets/newspaper.png", type: "paper", width: 80, height: 100 },
      { src: "./assets/plastic-bag.png", type: "plastic", width: 80, height: 100 },
      { src: "./assets/fish.png", type: "organic", width: 60, height: 110 },
      { src: "./assets/marvel-bottle.png", type: "glass", width: 105, height: 115 },
      { src: "./assets/amazon-box.png", type: "paper", width: 120, height: 65 },
      { src: "./assets/beer-can.png", type: "plastic", width: 100, height: 100 },
    ];
    let randomTrash = {};
    for (let i = 0; i < trashAssets.length; i++) {
      let randomIndex = Math.floor(Math.random() * trashAssets.length);
      randomTrash = trashAssets[randomIndex];
    }
    return randomTrash;
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`; // updates the DOM
    this.element.style.left = `${this.left}px`; // updates the DOM
  }

  move() {
    this.left += this.directionX;
    this.top += this.speed + this.directionY;
    // this.top += this.directionY;
    if (this.left <= 0) {
      this.left = 0;
    }
    if (this.left >= 900 - this.width) {
      this.left = 900 - this.width;
    }
    this.updatePosition();
  }

  wasCollectedRightBy(bin) {
    const trashRect = this.element.getBoundingClientRect();
    const binRect = bin.element.getBoundingClientRect();

    if (
      // all of the below needs to be true for a RIGHT collection to be true (trash touches correct bin)
      trashRect.left < binRect.right &&
      trashRect.right > binRect.left &&
      trashRect.top < binRect.bottom &&
      trashRect.bottom > binRect.top &&
      this.type === bin.type
    ) {
      // bin.yeahSound.play();
      this.element.classList.add("magictime", "vanishOut");
      const scoreElementh4 = document.querySelector("h4");
      scoreElementh4.classList.add("magictime", "puffIn");
      setTimeout(() => {
        scoreElementh4.classList.remove("magictime", "puffIn");
      }, 500);
      return true;
    } else {
      return false;
    }
  }

  wasCollectedWrongBy(bin) {
    const trashRect = this.element.getBoundingClientRect();
    const binRect = bin.element.getBoundingClientRect();

    if (
      trashRect.left < binRect.right &&
      trashRect.right > binRect.left &&
      trashRect.top < binRect.bottom &&
      trashRect.bottom > binRect.top &&
      this.type !== bin.type // trash touches the wrong bin
    ) {
      // bin.element.classList.add("magictime", "foolishIn");
      // const livesH4 = document.getElementById("lives-h4");
      // livesH4.classList.add("magictime", "holeOut");
      // setTimeout(() => {
      //   livesH4.classList.remove("magictime", "holeOut");
      // }, 300);
      bin.element.classList.add("shake")
      return true;
    } else {
      return false;
    }
  }
}
