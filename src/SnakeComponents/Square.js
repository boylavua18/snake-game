import React, { Component } from 'react';
import './Square.css';
class Square extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      mode: props.mode,
      snake: props.snake
    }
  }

  // update() {
  //   let snake = this.props.snake;
  //   snake.forEach((item)=>{
  //     console.log("checking")
  //     if(item.x === this.state.x && item.y===this.state.y) {
  //       this.setState({
  //         mode: true
  //       });
  //     }
  //   })
  // }

  componentWillReceiveProps(props) {
    console.log('OK')
    this.setState({
      mode: props.mode
    })
    // this.render()
  }

  render() {
    let mode = this.state.mode;
    let curSquare = null;
    if(mode) {
      curSquare = <div className="square snake"></div>;
    } else {
      curSquare = <div className="square"></div>;
    }
    return (curSquare);
  }
}

export default Square
