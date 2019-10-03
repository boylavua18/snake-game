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

  componentWillReceiveProps(props) {
    this.setState({
      mode: props.mode
    })
  }

  render() {
    let mode = this.state.mode;
    let curSquare = null;
    if(mode===true) {
      curSquare = <div className="square snake"></div>;
    } else if(mode===false) {
      curSquare = <div className="square"></div>;
    } else {
      curSquare = <div className="square food"></div>;
    }
    return (curSquare);
  }
}

export default Square
