import React, {Component} from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends Component {

  speed = 100;
  evMoving = null;
  constructor(props) {
    super(props);
    // let size =  this.props.size;
    // this.state = {
    //   matrix: [],
    //   snake: [],
    //   direct: 'right',
    //   status: 1
    // }
    // this.state.snake.push({
    //   x: Math.floor(size/2),
    //   y: Math.floor(size/2)
    // }, {
    //   x: Math.floor(size/2),
    //   y: Math.floor(size/2)-1
    // }, {
    //   x: Math.floor(size/2),
    //   y: Math.floor(size/2)-2
    // })
    // for(let i = 0; i < size; i++) {
    //   let squareStates = [];
    //   for(let j = 0; j < size; j++) {
    //     let check = this.isSnake(i,j)
    //     squareStates.push(check);
    //   }
    //   this.state.matrix.push(squareStates);
    // }

    this.refreshBoard()
  }

  updateMatrix = (tail, head) => {
    /*
      When snake is moving, its head will be the next block and its tail must be
      the nearest block with the previous tail.
      if its next moving is its body/blocks or reach to board's border, the game
      will end
    */
    let matrix = this.state.matrix;
    let nexMove = matrix[head.x][head.y]
    if(nexMove===true) {
      this.setState({status:0})
      clearInterval(this.evMoving)
      // alert('Lose!')
      let ap = window.confirm("You lose! Play again?");
      console.log(ap)
      if(ap) {
        console.log('PLay again')
        // this.refreshBoard()
        // this.render()
      }
    } else{
      if(nexMove===null) {
        this.autoFood()
      }
      matrix[head.x][head.y] = true
      matrix[tail.x][tail.y] = false
      this.setState({
        matrix: matrix
      })

    }
  }

  refreshBoard = () => {
    let size =  this.props.size;
    this.state = {
      matrix: [],
      snake: [],
      direct: 'right',
      status: 1
    }
    // this.setState({
    //   matrix: [],
    //   snake: [],
    //   direct: 'right',
    //   status: 1
    // })
    this.state.snake.push({
      x: Math.floor(size/2),
      y: Math.floor(size/2)
    }, {
      x: Math.floor(size/2),
      y: Math.floor(size/2)-1
    }, {
      x: Math.floor(size/2),
      y: Math.floor(size/2)-2
    })
    for(let i = 0; i < size; i++) {
      let squareStates = [];
      for(let j = 0; j < size; j++) {
        let check = this.isSnake(i,j)
        squareStates.push(check);
      }
      this.state.matrix.push(squareStates);
    }
  }

  snakeMoving = () => {
    /*
      When the snake director is changed, this function helps the snake keep
      movingon the correct direct which is changed by user action.
    */
    let bx = 0;
    let by = 0;
    switch(this.state.direct) {
      case 'left':
        bx = 0;
        by = -1;
        break;
      case 'up':
        bx = -1;
        by = 0;
        break;
      case 'right':
        bx = 0;
        by = 1;
        break;
      case 'down':
        bx = 1;
        by = 0;
        break;
    }

    let tmpSnake = this.state.snake;
    let matrix = this.state.matrix;
    let head = tmpSnake[0];
    let tail = null
    let nextMoveX = (head.x + bx) >= this.props.size || (head.x + bx) < 0 ? head.x:head.x+bx;
    let nextMoveY = (head.y + by) >= this.props.size || (head.y + by) < 0 ? head.y:head.y+by;
    if(matrix[nextMoveX][nextMoveY]===null) {
      /*
        if next move is a food, the snack will be fatter so we dont remove the last
        block in its body
      */
      tail = tmpSnake[tmpSnake.length-1]
    } else {
      /*
        if the next block is nothing, the snack keeps moving as normal
      */
      tail = tmpSnake.pop()
    }
    let mover = {
      x: nextMoveX,
      y: nextMoveY
    };
    this.updateMatrix(tail, mover)
    tmpSnake.unshift(mover);
    this.setState({snake: tmpSnake});
  }

  updateSnake = (ev) => {
    /*
      Catch the arrow key press event, when user press any arrow keys, the snake
      director will be changed.
      There are 4 modes: up, down, left, right
    */
    if(ev){
      if(ev.keyCode === 38 && this.state.direct !== 'down') {
        //up
        this.setState({direct: 'up'})
      } else if (ev.keyCode === 37 && this.state.direct !== 'right') {
        //left
        this.setState({direct: 'left'})
      } else if (ev.keyCode === 40 && this.state.direct !== 'up') {
        //down
        this.setState({direct: 'down'})
      } else if (ev.keyCode === 39 && this.state.direct !== 'left') {
        //right
        this.setState({direct: 'right'})
      }
    }
    ev.preventDefault()
  };

  isSnake = (x,y)=>{
    /*
    Check if the coord is snake body in the matrix or not
    */
    let rs = false
    this.state.snake.forEach((item)=>{
      if(item.x === x && item.y === y) {
        rs = true
      }
    })
    return rs
  }

  autoFood = () => {
    /*
      Auto generate food on board. If its coord is confict with the snake,
      the function will try to generate another coord til it is suitable.
    */
    let x = Math.floor(Math.random()*this.props.size-1);
    let y = Math.floor(Math.random()*this.props.size-1);
    let matrix = this.state.matrix;
    let curBlock = matrix[x][y]
    while(curBlock === true) {
      x = Math.floor(Math.random()*this.props.size-1);
      y = Math.floor(Math.random()*this.props.size-1);
      curBlock = matrix[x][y];
    }
    matrix[x][y] = null;
    this.setState({matrix: matrix})
  }

  componentDidMount() {
    //When the component is mounted, food will be generated randomly
    this.autoFood();
    //and the snake will start moving on its default director
    this.evMoving = setInterval(this.snakeMoving, this.speed);

  }

  componentDidUpdate() {
    if(this.state.status === 0) {

    }
  }

  render() {
    let boardSize = this.props.size;
    let boardRows = [];
    for(let i = 0; i < boardSize; i++) {
      let items = [];
      for(let j = 0; j < boardSize; j++) {
        let curSquare = <Square x={i} y={j} key={i+'-'+j} snake={this.state.snake} mode={this.state.matrix[i][j]}/>;
        items.push(curSquare);
      }
      let rowElm = <div className="board-row" key={i}>{items}</div>;
      boardRows.push(rowElm);
    }

    return (
      <div onKeyDown={ev=>this.updateSnake(ev)} tabIndex="0" >
        {boardRows}
      </div>
    )
  }
}

export default Board
