import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './App';
import '../src/style/index.css';

const Index = () => {
  return (
    <div>
      <App />
    </div>
  )
}

render(<Index />, document.getElementById('root'));
