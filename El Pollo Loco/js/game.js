let canvas;
let world;
let keyboard;
let isMuted = false;
let intervalIds = [];
let gameStarted = false;

const coin_sound = new Audio("El Pollo Loco/audio/coin.mp3");
const bottle_sound = new Audio("El Pollo Loco/audio/bottle.mp3");
const throw_sound = new Audio("El Pollo Loco/audio/throw.mp3");
const bottle_break = new Audio("El Pollo Loco/audio/bottle_break.mp3");
const won_sound = new Audio("El Pollo Loco/audio/game_won_sound.mp3");
const chicken_dead_sound = new Audio("El Pollo Loco/audio/chicken_dead.mp3");
const endboss_sound = new Audio("El Pollo Loco/audio/endboss_music.mp3");

const walking_sound = new Audio("El Pollo Loco/audio/running.mp3");
const jump_sound = new Audio("El Pollo Loco/audio/jump.mp3");
const hurt_sound = new Audio("El Pollo Loco/audio/hurt.mp3");
const gameover_sound = new Audio("El Pollo Loco/audio/game_over.mp3");
const background_sound = new Audio("El Pollo Loco/audio/background_music.mp3");

const allSounds = [
  coin_sound,
  bottle_sound,
  throw_sound,
  bottle_break,
  won_sound,
  chicken_dead_sound,
  endboss_sound,
  walking_sound,
  jump_sound,
  hurt_sound,
  gameover_sound,
  background_sound,
];


function init() {
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");
  keyboard = new Keyboard();
  keyboard.bindKeyPressEvents(); // Ensuring key press events are bound
  keyboard.bindBtsPressEvents();
  //showMobileBtns();
}


/**
 * Adds the provided interval to the collection of interval IDs.
 *
 * @param {type} interval - The interval ID to be added.
 */
function pushInterval(interval) {
  intervalIds.push(interval);
}


/**
 * Stops all intervals by clearing their IDs.
 *
 * @param {array} intervalIds - An array of interval IDs to be stopped
 * @return {undefined}
 */
function stopAllIntervals() {
  intervalIds.forEach((id) => clearInterval(id));
}


function toggleMuted() {
  isMuted = !isMuted;
  allSounds.forEach((sound) => (sound.muted = isMuted));
  updateMuteButton();
}


function updateMuteButton() {
  const muteButton = document.getElementById("mute");
  if (isMuted) {
    muteButton.classList.add("muted");
  } else {
    muteButton.classList.remove("muted");
  }
}


function startGame() {
  hideStartButton();
  initLevel();
  init();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  background_sound.loop = true;
  background_sound.play();
  background_sound.currentTime = 0;
  won_sound.pause();
  removeInstructions();
  showMobileBtns();
  gameStarted = true;
  switchToFullscreen('canvas');
}


function hideStartButton() {
  let startbutton = document.getElementById("start-button");
  let startScreen = document.getElementById("start-screen");
  startScreen.style.backgroundImage = "none";
  startbutton.classList.add("d-none");
}


function removeInstructions() {
  if (!checkIfMobileDevice()) {
    document.getElementById("instructions").style.display = "none";
  } else {
    if (window.innerHeight > 480) {
    document.getElementById("instructions-mobile").style.width = "90%";
    }
  }
}


function fullscreen() {
  if (gameStarted) {
    switchToFullscreen('canvas');
  } else {
    switchToFullscreen('start-screen');
  }
}

function switchToFullscreen(elementId) {
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => {
      // Nachdem der Vollbildmodus beendet wurde, wieder in den Vollbildmodus mit dem neuen Element wechseln
      let fullscreenElement = document.getElementById(elementId);
      enterFullscreen(fullscreenElement);
    });
  } else {
    // Wenn kein Vollbildmodus aktiv ist, direkt das neue Element in den Vollbildmodus versetzen
    let fullscreenElement = document.getElementById(elementId);
    enterFullscreen(fullscreenElement);
  }
}

function enterFullscreen(element) {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}


function checkIfMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|windows phone|iemobile|opera mini|tablet/.test(
        userAgent
      );
    return isMobileDevice;
  }
  
  
function showMobileBtns() {
    let instrMobile = document.getElementById("instructions-mobile");

    if (checkIfMobileDevice()) {
      instrMobile.classList.remove("d-none");
      instrMobile.classList.add("mobileBtns");
      document.getElementById('legal-container').classList.add('d-none');
      hideInstructions();
    } else {
      instrMobile.classList.add("d-none");
      instrMobile.classList.remove("mobileBtns");
      showInstructions();
    }
  }
  

function hideInstructions() {
  let elements = document.querySelectorAll(".instructions-text");
  elements.forEach((element) => {
    element.classList.add("d-none");
  });
}


function showInstructions() {
  let elements = document.querySelectorAll(".instructions-text");
  elements.forEach((element) => {
    element.classList.remove("d-none");
  });
}





function redirectToPrivacyPolice() {
  window.open("/html/privacyPolice.html", "_blank");
}


function redirectToLegalNotice() {
  window.open("html/legalNotice.html", "_blank");
}