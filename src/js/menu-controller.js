
class MenuController {
  constructor() {
    this.menuState = 'main';
    // instructions
  }

  init(startGame) {
    this.startGame = startGame;
    $('.instructions').hide();
    $('.instructions').html("Who added all these buttons?! <br> Oh well, I suppose you'll have to watch for the controls to survive.");
    $('.instructions').append($('#instructions-g1').html());
  }

  menuLeft() {
    if (this.menuState === 'main') {
      this.showInstructions();
    }
  }

  menuRight() {
    if (this.menuState === 'main') {
      this.startGame();
    }
  }

  hideMenu() {
    $('.main-menu').addClass('hidden');
  }

  showMenu() {
    $('.main-menu').removeClass('hidden');
    $('.title-extra').removeClass('hidden');
  }

  showInstructions() {
    $('.instructions').show();
    $('.instructions').removeClass('hidden');
    $('.main-menu').addClass('hidden');
  }

  hideInstructions() {
    $('.instructions').addClass('hidden');
    $('.main-menu').removeClass('hidden');
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
