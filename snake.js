
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

  initialize(){
    this.setBoard();
    this.board = $s('li').htmlElements;
    this.snake = this.board.slice(44,47);
    this.neck = 45;
    this.head = 46;
    this.direction = 'right';
    this.delay = 0;
    this.randomApple();
    this.loop();
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
    this.intervalID = setInterval(this.start.bind(this), 200);
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
    if(this.head < 0 || this.head > 399) this.gameOver();
    if( (this.head % 20 === 19) && (this.head < this.neck)) this.gameOver();
    if( (this.head % 20 === 0) && (this.head > this.neck)) this.gameOver();
  }

  gameOver(){
    clearInterval(this.intervalID);
    this.root.empty();
    this.initialize();
    // this.root.append('<img src=images/gameOver.png width=440 height=440 />');
  }


}

MOVE = {
  right: 1,
  left: -1,
  up: -20,
  down: 20
};

module.exports = Snake;
