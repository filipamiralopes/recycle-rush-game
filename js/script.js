window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const ourGame = new Game();

  // startButton.addEventListener("click", function () {
  startGame();
  // });
  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
  document.addEventListener("keydown", (event) => {
    key = event.key;
    switch (key) {
      case "ArrowRight":
        ourGame.trashArr[0].directionX = 6;
        break;
      case "ArrowLeft":
        ourGame.trashArr[0].directionX = -6;
        break;
      case "ArrowDown":
        ourGame.trashArr[0].directionY = 6;
        break;
    }
  });
  document.addEventListener("keyup", () => {
    ourGame.trashArr[0].directionX = 0;
    ourGame.trashArr[0].directionY = 0;
  });

  function startGame() {
    // console.log("start game");
    ourGame.start();
  }
};
