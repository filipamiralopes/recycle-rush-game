window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const muteMusicButton = document.getElementById("mute-music");
  const clickSound = new Audio ("./assets/audio/wet-click.wav")
  clickSound.volume = 0.7;
  const ourGame = new Game();

  startButton.addEventListener("click", function () {
    clickSound.play()
    startGame();
  });
  restartButton.addEventListener("click", () => {
    clickSound.play()
    window.location.reload();
  });
  muteMusicButton.addEventListener("click", () => {
    clickSound.play()
    if (ourGame.ambientMusic.paused){
      ourGame.ambientMusic.play()
    }
    else{
      ourGame.ambientMusic.pause()
    }
    
  });
  document.addEventListener("keydown", (event) => {
    key = event.key;
    switch (key) {
      case "ArrowRight":
        ourGame.trashArr[0].directionX = ourGame.speed;
        break;
      case "ArrowLeft":
        ourGame.trashArr[0].directionX = -ourGame.speed;
        break;
      case "ArrowDown":
        ourGame.trashArr[0].directionY = ourGame.speed;
        break;
    }
  });
  document.addEventListener("keyup", () => {
    ourGame.trashArr[0].directionX = 0;
    ourGame.trashArr[0].directionY = 0;
  });

  function startGame() {
    ourGame.start();
  }
};
