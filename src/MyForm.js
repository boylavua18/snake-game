import React, { Component } from 'react';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({
      [name]: val
    });
  }

  render() {
    return (
      <form>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter your name:</p>
        <input type='text' name='username' onChange={this.myChangeHandler} />
        <p>Enter your age:</p>
        <input type='text' name='age' onChange={this.myChangeHandler} />
      </form>
    )
  }
}

export default MyForm
