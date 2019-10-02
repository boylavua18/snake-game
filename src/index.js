import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const myfirstelement = <h1>Hello React! {5+5}</h1>

ReactDOM.render(
  // <App />,
  // React.createElement('h1', {}, 'I do not {}'),
  <App />,
  document.getElementById('root')
);
