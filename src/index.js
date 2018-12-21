import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './App';

const Index = () => {
  return (
    <div>
      <App />
    </div>
  )
}

render(<Index />, document.getElementById('root'));
