import React, { Component } from "react";
import "./Calculator.css";

//#region Imports de components:
import Button from "../components/Button";
import Display from "../components/Display";
//#endregion

const initalState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  value: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initalState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    console.log("limpar");

    this.setState({ ...initalState });
  }

  setOperation(operation) {
    if (operation === "x") {
      operation = "*";
    }

    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const finished = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.value];

      console.log(values[0]);

      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.value[0];
      }

      values[1] = 0;

      console.log(values[0]);

      this.setState({
        displayValue: values[0],
        operation: finished ? null : operation,
        current: finished ? 0 : 1,
        clearDisplay: !finished,
        value: values,
      });
    }
  }

  addDigit(n) {
    console.log(n);

    if (n === "." && this.state.displayValue.includes(".")) return;

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);

      const values = [...this.state.value];

      values[i] = newValue;

      this.setState({ value: values });

      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" col3 click={this.clearMemory} />
        <Button label="/" operation click={this.setOperation} />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="x" operation click={this.setOperation} />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" operation click={this.setOperation} />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" operation click={this.setOperation} />
        <Button label="0" click={this.addDigit} col2 />
        <Button label="." click={this.addDigit} />
        <Button label="=" operation click={this.setOperation} />
      </div>
    );
  }
}
