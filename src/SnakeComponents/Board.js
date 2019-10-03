import React, {Component} from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends Component {

  speed = 700;
  evMoving = null;
  constructor(props) {
    super(props);
    let size =  this.props.size;
    this.state = {
      matrix: [],
      snake: [],
      direct: 'right',
      status: 1
    }
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

  updateMatrix = (tail, head) => {
    let matrix = this.state.matrix;
    let nexMove = matrix[head.x][head.y]
    if(nexMove===true) {
      this.setState({status:0})
    } else{
      if(nexMove===null) {

        // matrix[head.x][head.y] = true
        // matrix[tail.x][tail.y] = true
        // let tmpSnake = this.state.snake;
        // tmpSnake.unshift(head);
        // this.setState({snake: tmpSnake});
        this.autoFood()
      }
      matrix[head.x][head.y] = true
      matrix[tail.x][tail.y] = false
      // }

      this.setState({
        matrix: matrix
      })

    }
  }

  snakeMoving = () => {
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
      tail = tmpSnake[tmpSnake.length-1]
    } else {
      tail = tmpSnake.pop()
    }
    let mover = {
      x: nextMoveX,
      y: nextMoveY
    };
    this.updateMatrix(tail, mover)
    tmpSnake.unshift(mover);
    this.setState({snake: tmpSnake});

    // this.updateMatrix(tail, mover)

    // tmpSnake.unshift(mover);
    // this.setState({snake: tmpSnake});

  }

  updateSnake = (ev) => {
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
    let rs = false
    this.state.snake.forEach((item)=>{
      if(item.x === x && item.y === y) {
        rs = true
      }
    })
    return rs
  }

  autoFood = () => {
    let x = Math.floor(Math.random()*this.props.size-1);
    let y = Math.floor(Math.random()*this.props.size-1);
    let matrix = this.state.matrix;
    console.log('generating!')
    let curBlock = matrix[x][y]
    while(curBlock === true) {
      x = Math.floor(Math.random()*this.props.size-1);
      y = Math.floor(Math.random()*this.props.size-1);
      curBlock = matrix[x][y];
    }
    matrix[x][y] = null;
    this.setState({matrix: matrix})
    console.log('generated!')
  }

  componentDidMount() {
    this.autoFood();
    this.evMoving = setInterval(this.snakeMoving, this.speed);

  }

  componentDidUpdate() {
    if(this.state.status === 0) {
      clearInterval(this.evMoving)
      // alert('Lose!')
    }
  }

  render() {
    let boardSize = this.props.size;
    let boardRows = [];
    for(let i = 0; i < boardSize; i++) {
      let items = [];
      for(let j = 0; j < boardSize; j++) {
        let curSquare = <Square x={i} y={j} snake={this.state.snake} mode={this.state.matrix[i][j]}/>;
        items.push(curSquare);
      }
      let rowElm = <div className="board-row">{items}</div>;
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
