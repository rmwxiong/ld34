
class MenuController {
  constructor() {
    this.menuLeft = this.menuLeft.bind(this);
    this.menuRight = this.menuRight.bind(this);
    this.menuState = 'main';
    this.realInstructions = false;
    this.gameCount = 0;
    // instructions
  }

  init(startGame) {
    this.startGame = startGame;
    $('.instructions-page').hide();
  }

  showRealInstructions() {
    document.title = 'Two Buttons and Growing';
    $('.title-extra').removeClass('hidden');
    $('.scores-container').removeClass('hidden');
    $('.instructions').html($('#instructions-real').html());
  }

  menuLeft() {
    if (this.menuState === 'main') {
      this.showInstructions();
      this.menuState = 'instructions';
    } else if (this.menuState === 'instructions') {
      this.showMenu();
      this.menuState = 'main';
    }
  }

  hide() {
    $('.main-menu').hide();
  }

  menuRight() {
    this.hideMenu();
    this.hideInstructions();
    this.startGame();
  }

  unlockGame(n) {
    console.log('unlock', n);
    $('#gi' + n + ' .game-info').removeClass('locked').html($('#instructions-g' + n).html());
  }

  hideMenu() {
    $('.title-page').addClass('hidden');
  }

  showMenu() {
    $('.main-menu').show();
    $('.title-page').show();
    $('.instructions-page').hide();
    $('.title-page').removeClass('hidden');
    $('.instructions-page').addClass('hidden');
  }

  showInstructions() {
    $('.instructions-page').show();
    $('.title-page').hide();
    $('.instructions-page').removeClass('hidden');
    $('.title-page').addClass('hidden');
  }

  hideInstructions() {
    $('.instructions-page').addClass('hidden');
  }
}

let instance;

function createMenuController() {
  if (!instance) {
    instance = new MenuController();
  }
  return instance;
}

export default {
  menuController: createMenuController()
};
