console.log('Hello World');

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import hello from './hello.jpeg';

const Hello = () => (
  <div id="hello">
    <img src={hello} alt="Logo" />
    <h1>Hello</h1>
  </div>
);

ReactDOM.render(<Hello />, document.getElementById('root'));
