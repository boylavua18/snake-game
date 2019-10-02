import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './Test.js';
import MyForm from './MyForm.js';
import Board from './SnakeComponents/Board.js';
// <Test favcol="yellow"/>
class App extends Component {
  render() {
    return (
      <div className="App">
        <Board size='50'/>
      </div>
    );
  }
}

export default App;
