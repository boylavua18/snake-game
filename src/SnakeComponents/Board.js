import React, {Component} from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends Component {


  constructor(props) {
    super(props);
    let size =  this.props.size;
    this.state = {
      matrix: [],
      snake: []
    }
    this.state.snake.push({
      x: Math.floor(size/5),
      y: Math.floor(size/5)
    })
  }

  updateSnake = (ev) => {
    if(ev){
      if(ev.keyCode == 37) {
        //left
        let tmpSnake = this.state.snake;
        let head = tmpSnake.pop();
        let moveLeft = {
          x: head.x - 1,
          y: head.y
        };
        // tmpSnake.pop();
        tmpSnake.push(moveLeft);
        this.setState({snake: tmpSnake});
        console.log(this.state.snake)
      } else if (ev.keyCode == 38) {
        //up
      } else if (ev.keyCode == 39) {
        //right
      } else if (ev.keyCode == 40) {
        //down
      }
    }
  };

  handler = ()=> {
    // this.setState
  }

  render() {
    let boardSize = this.props.size;
    let boardRows = [];
    for(let i = 0; i < boardSize; i++) {
      let items = [];
      for(let j = 0; j < boardSize; j++) {
        let curSquare = <Square x={i} y={j} snake={this.state.snake}/>;
        items.push(curSquare);
      }
      let rowElm = <div className="board-row">{items}</div>;
      this.state.matrix.push(items);
      boardRows.push(rowElm);
    }
    this.updateSnake();
    return (
      <div onKeyDown={(ev)=>this.updateSnake(ev)}>
        {boardRows}
      </div>
    )
  }
}

export default Board
