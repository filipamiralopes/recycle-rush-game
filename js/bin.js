class Bin {
  constructor(gameScreen, left) {
    this.gameScreen = gameScreen;

    this.top = 600 - 90; // this.width - 90
    this.left = left;
    this.width = 110;
    this.height = 120;


    this.element = document.createElement("img");

    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
  }
}

class blueBin extends Bin {
  constructor(gameScreen, left) {
    super(gameScreen, left);
    this.type = "paper";
    this.element.src = "./assets/blue-bin.png";

    this.gameScreen.appendChild(this.element);
  }
}

class yellowBin extends Bin {
  constructor(gameScreen, left) {
    super(gameScreen, left);
    this.type = "plastic";
    this.element.src = "./assets/yellow-bin.png";

    this.gameScreen.appendChild(this.element);
  }
}

class greenBin extends Bin {
  constructor(gameScreen, left) {
    super(gameScreen, left);
    this.type = "glass";
    this.element.src = "./assets/green-bin.png";

    this.gameScreen.appendChild(this.element);
  }
}

class brownBin extends Bin {
  constructor(gameScreen, left) {
    super(gameScreen, left);
    this.type = "organic";
    this.element.src = "./assets/brown-bin.png";

    this.gameScreen.appendChild(this.element);
  }
}
