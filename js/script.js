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
    // event from the browser
    // Note: do a switch case
    if (event.code === "ArrowRight") {
      // then we move our trash to the right
      ourGame.trashArr[0].directionX = 6;
    } else if (event.code === "ArrowLeft") {
      ourGame.trashArr[0].directionX = -6;
    } else if (event.code === "ArrowUp") {
      // REMOVE THIS
      ourGame.trashArr[0].directionY = -6;
    } else if (event.code === "ArrowDown") {
      ourGame.trashArr[0].directionY = 6;
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
