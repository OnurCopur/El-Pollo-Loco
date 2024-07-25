/**
 * Class representing the keyboard controls for the game.
 * Handles both key press events and button press events for touch devices.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Constructs the keyboard object and binds the key press and button press events.
   */
  constructor() {
      this.bindKeyPressEvents();
      this.bindBtsPressEvents();
  }

  /**
   * Binds the key press events to the corresponding flags.
   */
  bindKeyPressEvents() {
      window.addEventListener('keydown', (e) => {
          if (e.keyCode == 39) {
              this.RIGHT = true;
          }
          if (e.keyCode == 37) {
              this.LEFT = true;
          }
          if (e.keyCode == 38) {
              this.UP = true;
          }
          if (e.keyCode == 40) {
              this.DOWN = true;
          }
          if (e.keyCode == 32) {
              this.SPACE = true;
          }
          if (e.keyCode == 68) {
              this.D = true;
          }
      });

      window.addEventListener('keyup', (e) => {
          if (e.keyCode == 39) {
              this.RIGHT = false;
          }
          if (e.keyCode == 37) {
              this.LEFT = false;
          }
          if (e.keyCode == 38) {
              this.UP = false;
          }
          if (e.keyCode == 40) {
              this.DOWN = false;
          }
          if (e.keyCode == 32) {
              this.SPACE = false;
          }
          if (e.keyCode == 68) {
              this.D = false;
          }
      });
  }

  /**
   * Binds the button press events for touch devices to the corresponding flags.
   */
  bindBtsPressEvents() {
      document.getElementById('mobile-left').addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.LEFT = true;
      });
      document.getElementById('mobile-left').addEventListener('touchend', (e) => {
          e.preventDefault();
          this.LEFT = false;
      });

      document.getElementById('mobile-right').addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.RIGHT = true;
      });
      document.getElementById('mobile-right').addEventListener('touchend', (e) => {
          e.preventDefault();
          this.RIGHT = false;
      });

      document.getElementById('mobile-up').addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.UP = true;
      });
      document.getElementById('mobile-up').addEventListener('touchend', (e) => {
          e.preventDefault();
          this.UP = false;
      });

      document.getElementById('mobile-throw').addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.SPACE = true;
      });
      document.getElementById('mobile-throw').addEventListener('touchend', (e) => {
          e.preventDefault();
          this.SPACE = false;
      });
  }
}
