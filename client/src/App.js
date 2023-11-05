import React, { Component } from 'react';
import axios from 'axios';
let ENDPOINT = 'http://localhost:3000/users';
class CalculatorBeds extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      first: '',
      second: '',
      history: [],
      input: '',
      operator: '',
    };
  }

  btnHandleClick = (value) => {
    if (value == '+' || value == '-' || value == '*' || value == '/') {
      this.setState({ operator: value });
    }
    this.setState((prevState) => ({
      input: prevState.input + value,
    }));

    const numbers = (this.state.input + value).match(
      /[-]{0,1}[\d]*[.]{0,1}[\d]+/g
    );

    if (numbers) {
      const first = +numbers[0];
      const second = Math.abs(numbers[1]);

      if (!isNaN(first) && !isNaN(second)) {
        this.setState({ first, second });
      } else {
        console.log('Not valid yet');
      }
    } else {
      console.log('Not valid yet');
    }
  };

  operatorClick = (value) => {
    this.setState(() => ({
      input: value,
    }));
  };

  handleClear = async () => {
    this.setState({
      first: '',
      second: '',
      operator: '',
      input: '',
      history: [],
      show: false,
    });
    await axios.post(ENDPOINT + '/empty');
  };

  showHistory = async () => {
    const response = await axios.get(ENDPOINT + '/all');
    console.log(JSON.parse(JSON.stringify(response.data.data)));
    this.setState(() => ({
      show: true,
      history: JSON.parse(JSON.stringify(response.data.data)) || [],
    }));
  };

  handleCalculate = async () => {
    try {
      console.log(this.state);
      let key = '';
      if (this.state.operator === '*') {
        key = '/multiplication';
      }
      if (this.state.operator === '/') {
        key = '/division';
      }
      if (this.state.operator === '-') {
        key = '/subtraction';
      }
      if (this.state.operator === '+') {
        key = '/addition';
      }
      const response = await axios.post(ENDPOINT + key, {
        first: this.state.first,
        second: this.state.second,
      });
      console.log(response);
      this.setState(() => ({
        input: JSON.parse(response.data.data),
      }));
    } catch (error) {
      this.setState({
        input: 'Error',
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.input} readOnly />
        </div>
        <div>
          <button onClick={() => this.btnHandleClick('1')}>1</button>
          <button onClick={() => this.btnHandleClick('2')}>2</button>
          <button onClick={() => this.btnHandleClick('3')}>3</button>
          <button onClick={() => this.btnHandleClick('4')}>4</button>
          <button onClick={() => this.btnHandleClick('5')}>5</button>
          <button onClick={() => this.btnHandleClick('6')}>6</button>
          <button onClick={() => this.btnHandleClick('7')}>7</button>
          <button onClick={() => this.btnHandleClick('8')}>8</button>
          <button onClick={() => this.btnHandleClick('9')}>9</button>
          <button onClick={() => this.btnHandleClick('0')}>0</button>
        </div>
        <div>
          <button onClick={() => this.btnHandleClick('/')}>/</button>
          <button onClick={() => this.btnHandleClick('*')}>*</button>
          <button onClick={() => this.btnHandleClick('+')}>+</button>
          <button onClick={() => this.btnHandleClick('-')}>-</button>
        </div>
        <div>
          <button onClick={this.handleCalculate}>Ans</button>
        </div>
        <div>
          <button onClick={this.showHistory}>Display History</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        {this.state.history.length > 0 ? (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Action</th>
                  <th>Input</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.action}</td>
                    <td>{item.input}</td>
                    <td>{item.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p>No Data Found</p>
          </>
        )}
      </div>
    );
  }
}

export default CalculatorBeds;
