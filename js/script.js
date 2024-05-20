window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const ourGame = new Game();
  
    // startButton.addEventListener("click", function () {
    startGame();
    // });
    restartButton.addEventListener("click", () => {
      window.location.reload()
    })
    document.addEventListener("keydown", (event) => { // event from the browser
      // Note: do a switch case
      if (event.code === "ArrowRight") {
        // then we move our trash to the right
        ourGame.trash.directionX = 4;
      } else if (event.code === "ArrowLeft") {
        ourGame.trash.directionX = -4;
      } else if (event.code === "ArrowUp") { // REMOVE THIS
        ourGame.trash.directionY = -4;
      } else if (event.code === "ArrowDown") {
        ourGame.trash.directionY = 4;
      }
    });
    document.addEventListener("keyup", () => {
      ourGame.trash.directionX = 0;
      ourGame.trash.directionY = 0;
    });
  
    function startGame() {
      // console.log("start game");
      ourGame.start();
    }
  };
  