class Trash {
  constructor(gameScreen, top, left) {
    const randomTrash = this.getRandomTrash();

    this.gameScreen = gameScreen;
    this.top = 0;
    this.left = Math.floor(Math.random() * (700 - 20 + 1)) + 20;
    this.width = 80;
    this.height = 100;
    this.directionX = 0;
    this.directionY = 0;

    this.type = randomTrash.type;
    this.speed = 0; // change to 2

    this.element = document.createElement("img");
    this.element.src = randomTrash.src;

    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  getRandomTrash() {
    const trashAssets = [
      { src: "./assets/banana-peel.png", type: "organic" },
      { src: "./assets/beer-bottle.png", type: "glass" },
      { src: "./assets/newspaper.png", type: "paper" },
      { src: "./assets/plastic-bag.png", type: "plastic" },
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
      this.element.classList.add("magictime", "vanishOut");
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
      bin.element.classList.add("magictime", "foolishIn");
      return true;
    } else {
      return false;
    }
  }
}
