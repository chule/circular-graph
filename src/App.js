import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

import Circulargraph from "./Circulargraph";
//import Demo from "./Circulargraph/Demo"

class App extends Component {
  state = {
    data: {
      id: "5brs20",
      Name: "Shell0",
      TotalScore: [40, 60, 80, 70, 88],
      Dividend: [45, 70, 90, 70, 90],
      Balans: [40, 65, 70, 70, 82],
      Growth: [35, 55, 64, 85, 44],
      Valuation: [40, 50, 75, 73, 74]
    },
    year: 4
  };

  changeData = () => {
    this.setState(oldState => {
      if (oldState.year === 0) {
        return { year: 4 };
      }

      return { year: oldState.year - 1 };
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.changeData}>
            Change year, year index = {this.state.year}
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "50%", height: "350px" }}>
            <Circulargraph data={this.state.data} year={this.state.year} />
          </div>

          <div style={{ width: "50%", height: "350px" }}>
            <Circulargraph data={this.state.data} year={this.state.year} />
          </div>
        </div>

      <div className="testGraph"></div>

      </div>
    );
  }
}

export default App;
