class Bin {
  constructor(gameScreen, top, left, width, height, binImage) {
    this.gameScreen = gameScreen;
    // this.positionArr = [85, 300];
    // this.randomIndex = Math.floor(Math.random() * this.positionArr.length);

    this.top = top;
    this.left = left;
    
    this.width = width;
    this.height = height;

    this.element = document.createElement("img");
    this.element.src = binImage;
    this.element.style.position = "absolute";

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    
    this.gameScreen.appendChild(this.element);
  }
}
