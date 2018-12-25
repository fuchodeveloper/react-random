import React, {Component} from 'react';
import axios from 'axios';
import alertify from 'alertify.js';

class App extends Component {
  state = {
    randomNumberState: [],
    selected: '',
  }

  handleChange = event => {
    this.setState({
      selected: event.target.value
    },
      () => (this.sortNumbers(this.state)));
  }

  sortNumbers = state => {
    let result;
    const { selected, randomNumberState } = state;

    if (selected === 'ascending') {
      result = randomNumberState.sort((a, b) => a - b);
    } else {
      result = randomNumberState.sort((a, b) => b - a);
    }

    this.setState(() => ({ randomNumberState: result }));
  }

  savePhonenumbers = () => {
    this.saveAction(this.state.randomNumberState);
  }

  saveAction = phoneNumbers => {
    return axios.post('/save', phoneNumbers)
      .then(function (response) {
        alertify.delay(900);
        alertify.logPosition('top right');
        alertify.success(response.data.message);
      })
      .catch(function (error) {
          alertify.delay(900);
          alertify.logPosition('top right');
          alertify.error(error.response.data.message);
      });
  }

  generatePhoneNumbers = () => {
    let randomNumberArray = [];

    const maxAllowed = 100;

    let array = new Uint32Array(maxAllowed);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < array.length; i++) {
      const sliceNumber = array[i].toString().slice(0, 7);
      randomNumberArray.push(`080${sliceNumber}`);
    }
    this.setState(() => ({
      randomNumberState: randomNumberArray,
      selected: '',
    }));
  }

  render() {
    const { randomNumberState, selected } = this.state;
    const maxNumber = Math.max(...randomNumberState);
    const minNumber = Math.min(...randomNumberState);

    return (
      <div className="wrapper">
        <div className="center">
          <h1>Random phone number generator</h1>
          <p>Generate phone numbers: </p> 
          <button className="generate-button" onClick={this.generatePhoneNumbers}>Generate</button>

          {
            randomNumberState.length > 0 &&
            <div>
              <p>
                Total numbers generated: {randomNumberState.length}
              <span className="pipe">|</span>
                Max number: {`0${maxNumber}`}
              <span className="pipe">|</span>
                Min number: {`0${minNumber}`}
              <span className="pipe">|</span>
                Sort:
              <span className="pipe" />
                <select id="select" value={selected} onChange={this.handleChange}>
                  <option value="" disabled>-- select --</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </p>
              <div>
                <div className="numbers-container">
                  <h2>Phone Numbers</h2>
                  <div className="numbers-display">
                    {randomNumberState.map(number => <p key={number}>{number}</p>)}
                  </div>
                  <button 
                    className="save-button"
                    onClick={this.savePhonenumbers}
                  >Save</button>
                </div>
              </div>
            </div>
          }
          
        </div>
        
      </div>
    );
  }
}

export default App;
