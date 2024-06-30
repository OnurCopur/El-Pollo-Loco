let canvas;
let world;
let keyboard = new Keyboard();

let isMuted = false;






const coin_sound = new Audio("El Pollo Loco/audio/coin.mp3");
const bottle_sound = new Audio("El Pollo Loco/audio/bottle.mp3");
const throw_sound = new Audio("El Pollo Loco/audio/throw.mp3");
const bottle_break = new Audio("El Pollo Loco/audio/bottle_break.mp3");
const won_sound = new Audio("El Pollo Loco/audio/game_won_sound.mp3");
const chicken_dead_sound = new Audio("El Pollo Loco/audio/chicken_dead.mp3");
const endboss_sound = new Audio('El Pollo Loco/audio/endboss_music.mp3');

const walking_sound = new Audio("El Pollo Loco/audio/running.mp3");
const jump_sound = new Audio("El Pollo Loco/audio/jump.mp3");
const hurt_sound = new Audio('El Pollo Loco/audio/hurt.mp3');
const gameover_sound = new Audio('El Pollo Loco/audio/game_over.mp3');
const background_sound = new Audio("El Pollo Loco/audio/background_music.mp3");

const allSounds = [
    coin_sound, bottle_sound, throw_sound, bottle_break, won_sound,
    chicken_dead_sound, endboss_sound, walking_sound, jump_sound,
    hurt_sound, gameover_sound, background_sound
];

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
}

function toggleMuted() {
    isMuted = !isMuted;
    allSounds.forEach(sound => sound.muted = isMuted);
    updateMuteButton();
}

function updateMuteButton() {
    const muteButton = document.getElementById('mute');
    if (isMuted) {
        muteButton.classList.add('muted');
    } else {
        muteButton.classList.remove('muted');
    }
}

function startGame() {
    world = new World(canvas, keyboard);
    console.log('Game started. My character is', world['character']);
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('game-buttons').classList.remove('d-none');
    background_sound.play();
}

function showControls() {
    document.getElementById('instructions').classList.toggle('d-none');
}

function fullscreen() {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

function hideGameOverScreen() {
    let gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.style.display = "none";
    showMobileBtns();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
      }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
      }
});

function redirectToPrivacyPolice() {
    window.open("/html/privacyPolice.html", "_blank");
}

function redirectToLegalNotice() {
    window.open("html/legalNotice.html", "_blank");
}
