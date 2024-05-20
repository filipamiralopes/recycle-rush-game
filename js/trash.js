class Trash {
  constructor(gameScreen, top, left, width, height, trashImage) {
    this.gameScreen = gameScreen;
    
    this.top = top;
    this.left = left;
    
    this.width = width;
    this.height = height;

    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = trashImage;
    this.element.style.position = "absolute";

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`; // updates the DOM
    this.element.style.left = `${this.left}px`; // updates the DOM
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;
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
