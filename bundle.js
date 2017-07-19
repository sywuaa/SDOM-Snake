/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


class Snake {
  constructor(root) {
    this.root = root;
    this.setBoard();
    this.board = $s('li').htmlElements;
    this.snake = this.board.slice(44,47);
    this.neck = 45;
    this.head = 46;
    this.direction = 'right';
    this.delay = 0;
    this.randomApple();
    this.loop();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    document.addEventListener( 'keydown', this.handleKeyPress );
  }

  randomApple(){
    let num = Math.floor(Math.random() * 400);
    let appleBlock = $s(this.board[num]);
    if ( appleBlock.attr('class')){
      this.randomApple();
    }else {
      appleBlock.addClass('apple');
    }
  }

  handleKeyPress(e){
    let def = this.direction;
    switch( e.keyCode ){
      case 37:
        if( def !== 'right' ){
          def = 'left';
        }
        break;

      case 38:
        if( def !== 'down' ){
          def = 'up';
        }
        break;

      case 39:
        if( def !== 'left'){
          def = 'right';
        }
        break;

      case 40:
        if( def !== 'up' ){
          def = 'down';
        }
        break;

      default:
        def = this.direction;
    }
    this.direction = def;
  }

  setBoard(){
    for( let i = 0; i < 400; i++) {
      this.root.append(`<li key=${i}></li>`);
    }
  }

  move(){
    this.neck = this.head;
    this.head += MOVE[this.direction];
    this.checkGameOver();

    this.checkApple();
    this.snake.push(this.board[this.head]);
    this.checkTail();
  }

  checkApple(){
    let currentBlock = $s(this.board[this.head]);
    if(currentBlock.attr('class') === 'apple'){
      currentBlock.removeClass('apple');
      this.delay = 2;
      this.randomApple();
    }else if (currentBlock.attr('class') === 'snake') {
      this.gameOver();
    }
  }

  checkTail() {
    if(this.delay === 0){
      let tail = $s(this.snake.shift());
      tail.removeClass('snake');
    }else {
      this.delay -= 1;
    }
  }

  loop(){
    this.intervalID = setInterval(this.start.bind(this), 500);
  }

  start() {
    this.move();
    this.render();
  }

  snakeDOM() {
    this.snakeDomSegs = this.snake.map( (el) => $s(el));
  }

  render(){
    this.snakeDOM();
    this.snakeDomSegs.forEach( (el) => (el).addClass('snake'));
  }

  checkGameOver(){
    if(this.head < 0 || this.head > this.board.length) this.gameOver();
    if( (this.head % 20 === 19) && (this.head < this.neck)) this.gameOver();
    if( (this.head % 20 === 0) && (this.head > this.neck)) this.gameOver();
  }

  gameOver(){
    clearInterval(this.intervalID);
    this.root.empty();
    this.root.append('<img src=images/gameOver.png width=440 height=440 />');
  }



}

MOVE = {
  right: 1,
  left: -1,
  up: -20,
  down: 20
};

module.exports = Snake;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);

$s( () => {
  const root = $s('div');
  new Snake(root);
});


/***/ })
/******/ ]);