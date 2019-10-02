import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
    this.shoot = this.shoot.bind(this)
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {favoritecolor: props.favcol};
  // }

  shouldComponentUpdate() {
    return true;
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({favoritecolor: "yellow"})
  //   }, 1000)
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before: " + prevState.favoritecolor;
  }

  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "After: " + this.state.favoritecolor;
  }

  // shoot() {
  //   alert(this.state.favoritecolor);
  // }

  shoot = (arg,ev) => {
    alert(ev.type)
  }

  changeColor = () => {

    if(this.state.favoritecolor == "red") {
      this.setState({
        favoritecolor: "blue"
      });
    } else {
      this.setState({
        favoritecolor: "red"
      });
    }

  }

  render() {
    return (
      <div>
        <h2>Test {this.state.favoritecolor}</h2>
        <button type="button" onClick={this.changeColor}>Change Color</button>
        <button type="button" onClick={(ev)=>this.shoot("Test", ev)}>Test bind</button>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

export default Test
