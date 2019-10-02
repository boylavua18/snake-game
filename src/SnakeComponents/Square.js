import React, { Component } from 'react';
import './Square.css';
class Square extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      mode: false,
      snake: props.snake
    }
  }
  getSnapshotBeforeUpdate() {
    let snake = this.props.snake;
    snake.forEach((item)=>{
      console.log("checking")
      if(item.x == this.state.x && item.y==this.state.y) {
        this.setState({
          mode: true
        });
      }
    })
  }
  // updateMode = ()=>{
  //
  // }

  render() {
    let mode = this.state.mode;
    let curSquare = null;
    if(mode) {
      curSquare = <button className="square snake"></button>;
    } else {
      curSquare = <button className="square"></button>;
    }
    return (curSquare);
  }
}

export default Square
