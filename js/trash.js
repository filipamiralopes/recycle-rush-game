class Trash {
  constructor(gameScreen, top, left) {
    this.gameScreen = gameScreen;

    this.top = 0;
    this.left = Math.floor(Math.random() * (700 - 20 + 1)) + 20;

    this.width = 80;
    this.height = 100;

    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = this.getRandomTrash();
    this.element.style.position = "absolute";

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  getRandomTrash() {
    const banana = "./assets/banana-peel.png";
    const beerBottle = "./assets/beer-bottle.png";
    const newspaper = "./assets/newspaper.png";
    const plasticBag = "./assets/plastic-bag.png";

    const assets = [banana, beerBottle, newspaper, plasticBag];
    let randomTrash = "";
    for (let i = 0; i < assets.length; i++) {
      let randomIndex = Math.floor(Math.random() * assets.length);
      randomTrash = assets[randomIndex];
    }
    return randomTrash;
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`; // updates the DOM
    this.element.style.left = `${this.left}px`; // updates the DOM
  }

  move() {
    this.left += this.directionX;
    this.top += 3;
    this.updatePosition();
  }

  wasCollectedBy(bin) {
    const trashRect = this.element.getBoundingClientRect();
    const binRect = bin.element.getBoundingClientRect();

    if (
      // all of the below needs to be true for a collection to be true (trash touches bin)
      trashRect.left < binRect.right &&
      trashRect.right > binRect.left &&
      trashRect.top < binRect.bottom &&
      trashRect.bottom > binRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
