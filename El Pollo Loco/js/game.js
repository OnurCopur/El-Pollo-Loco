let canvas;
let world;
let keyboard;
let isMuted = false;
let intervalIds = [];


/** @type {HTMLAudioElement} */
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


/**
 * An array containing all the sound elements used in the game.
 * @type {HTMLAudioElement[]}
 */
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


/**
 * Initializes the game by setting up the keyboard and hiding screens.
 */
function init() {
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("win-screen").classList.add("d-none");
  keyboard = new Keyboard();
  keyboard.bindKeyPressEvents();
  keyboard.bindBtsPressEvents();
}


/**
 * Adds the provided interval to the collection of interval IDs.
 *
 * @param {number} interval - The interval ID to be added.
 */
function pushInterval(interval) {
  intervalIds.push(interval);
}


/**
 * Stops all intervals by clearing their IDs.
 */
function stopAllIntervals() {
  intervalIds.forEach((id) => clearInterval(id));
}


/**
 * Toggles the mute state of the game sounds.
 */
function toggleMuted() {
  isMuted = !isMuted;
  allSounds.forEach((sound) => (sound.muted = isMuted));
  updateMuteButton();
}


/**
 * Updates the mute button appearance based on the mute state.
 */
function updateMuteButton() {
  const muteButton = document.getElementById("mute");
  if (isMuted) {
    muteButton.classList.add("muted");
  } else {
    muteButton.classList.remove("muted");
  }
}


/**
 * Starts the game by initializing the level and game world.
 */
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
}


/**
 * Hides the start button and start screen background.
 */
function hideStartButton() {
  let startbutton = document.getElementById("start-button");
  let startScreen = document.getElementById("start-screen");
  startScreen.style.backgroundImage = "none";
  startbutton.classList.add("d-none");
}


/**
 * Removes instructions based on the device type.
 */
function removeInstructions() {
  if (!checkIfMobileDevice()) {
    document.getElementById("instructions").style.display = "none";
  } else {
    if (window.innerHeight > 480) {
      document.getElementById("instructions-mobile").style.width = "90%";
    }
  }
}


/**
 * Enters fullscreen mode.
 */
function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
  adjustMargins(true);
}


/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  adjustMargins(false);
}


/**
 * Adjusts the margins of game over and win screens based on fullscreen mode.
 *
 * @param {boolean} isFullscreen - Whether the screen is in fullscreen mode.
 */
function adjustMargins(isFullscreen) {
  const marginValue = isFullscreen ? '130px' : '50px';

  const gameOverScreen = document.getElementById('game-over-screen');
  const winScreen = document.getElementById('win-screen');

  if (gameOverScreen) {
    gameOverScreen.style.marginBottom = marginValue;
  }
  if (winScreen) {
    winScreen.style.marginBottom = marginValue;
  }
}


/**
 * Toggles fullscreen mode on and off.
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
}


// Event listeners for fullscreen changes
document.addEventListener('fullscreenchange', () => adjustMargins(!!document.fullscreenElement));
document.addEventListener('mozfullscreenchange', () => adjustMargins(!!document.mozFullScreenElement));
document.addEventListener('webkitfullscreenchange', () => adjustMargins(!!document.webkitFullscreenElement));
document.addEventListener('msfullscreenchange', () => adjustMargins(!!document.msFullscreenElement));


// Initial call to adjust margins if already in fullscreen mode
adjustMargins(!!document.fullscreenElement || !!document.mozFullScreenElement || !!document.webkitFullscreenElement || !!document.msFullscreenElement);


/**
 * Checks if the device is a mobile device.
 *
 * @returns {boolean} True if the device is mobile, otherwise false.
 */
function checkIfMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone|iemobile|opera mini|tablet/.test(userAgent);
  return isMobileDevice;
}


/**
 * Shows or hides mobile buttons based on the device type.
 */
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


/**
 * Hides instructions for desktop devices.
 */
function hideInstructions() {
  let elements = document.querySelectorAll(".instructions-text");
  elements.forEach((element) => {
    element.classList.add("d-none");
  });
}


/**
 * Shows instructions for desktop devices.
 */
function showInstructions() {
  let elements = document.querySelectorAll(".instructions-text");
  elements.forEach((element) => {
    element.classList.remove("d-none");
  });
}


window.addEventListener("resize", checkIfMobileDevice);


/**
 * Redirects to the privacy policy page.
 */
function redirectToPrivacyPolice() {
  window.open("/html/privacyPolice.html", "_blank");
}


/**
 * Redirects to the legal notice page.
 */
function redirectToLegalNotice() {
  window.open("html/legalNotice.html", "_blank");
}
