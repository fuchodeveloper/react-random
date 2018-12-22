import React, {Component} from 'react';
import saveAction from './action/saveAction';

class App extends Component {

  state = {
    randomNumberState: [],
    selected: ''
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
    saveAction(this.state.randomNumberState);
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
      <div>
        <h1>Random phone number generator</h1>
        <p>Generate phone numbers: <button onClick={this.generatePhoneNumbers}>Generate</button></p>
        {/* show only when length is > 0 */}
        {
          randomNumberState.length > 0 &&
          <div>
            <p>
              Total numbers generated: {randomNumberState.length}
              &nbsp; | &nbsp;
              Max number: {`0${maxNumber}`}
              &nbsp; | &nbsp;
              Min number: {`0${minNumber}`}
              &nbsp; | &nbsp;
              <button onClick={this.savePhonenumbers}>Save</button>

              Sort:
              <select value={selected} onChange={this.handleChange}>
                <option value="" disabled>-- select --</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </p>
            <div>{randomNumberState.map(number => <p key={number}>{number}</p>)}</div>
          </div>
        }
      </div>
    );
  }
}

export default App;
