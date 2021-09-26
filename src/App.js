import './App.css';
import React from 'react';
import {Component} from 'react';
import Map from './components/Map';
import Shape from './components/Shape';

// const raw_data = {
//   "0": {
//     "State": "AK",
//     "City": "ANCHORAGE",
//     "Month": "jan",
//     "Offenses Reported or Known Commercial Sex Acts": "00001",
//     "Offenses Reported or Known Involuntary Servitude": "00000",
//     "Offenses Reported or Known Grand Total": "00001",
//     "Unfounded Commercial Sex Acts": "00000",
//     "Unfounded Involuntary Servitude": "00000",
//     "Unfounded Grand Total": "00000",
//     "Number of Actual Offenses Commercial Sex Acts": "00001",
//     "Number of Actual Offenses Involuntary Servitude": "00000",
//     "Number of Actual Offenses Grand Total": "00001",
//     "Total Offenses Cleared Commercial Sex Acts": "00000",
//     "Total Offenses Cleared Involuntary Servitude": "00000",
//     "Total Offenses Cleared Grand Total": "00000",
//     "Number of Clearances Under 18 Commercial Sex Acts": "00000",
//     "Number of Clearances Under 18 Involuntary Servitude": "00000",
//     "Number of Clearances Under 18 Grand Total": "00000"
//   },
//   "1": {
//     "State": "AK",
//     "City": "ANCHORAGE",
//     "Month": "feb",
//     "Offenses Reported or Known Commercial Sex Acts": "00000",
//     "Offenses Reported or Known Involuntary Servitude": "00000",
//     "Offenses Reported or Known Grand Total": "00000",
//     "Unfounded Commercial Sex Acts": "00000",
//     "Unfounded Involuntary Servitude": "00000",
//     "Unfounded Grand Total": "00000",
//     "Number of Actual Offenses Commercial Sex Acts": "00000",
//     "Number of Actual Offenses Involuntary Servitude": "00000",
//     "Number of Actual Offenses Grand Total": "00000",
//     "Total Offenses Cleared Commercial Sex Acts": "00000",
//     "Total Offenses Cleared Involuntary Servitude": "00000",
//     "Total Offenses Cleared Grand Total": "00000",
//     "Number of Clearances Under 18 Commercial Sex Acts": "00000",
//     "Number of Clearances Under 18 Involuntary Servitude": "00000",
//     "Number of Clearances Under 18 Grand Total": "00000"
//   },
//   "2": {
//     "State": "AK",
//     "City": "ANCHORAGE",
//     "Month": "mar",
//     "Offenses Reported or Known Commercial Sex Acts": "00000",
//     "Offenses Reported or Known Involuntary Servitude": "00000",
//     "Offenses Reported or Known Grand Total": "00000",
//     "Unfounded Commercial Sex Acts": "00000",
//     "Unfounded Involuntary Servitude": "00000",
//     "Unfounded Grand Total": "00000",
//     "Number of Actual Offenses Commercial Sex Acts": "00000",
//     "Number of Actual Offenses Involuntary Servitude": "00000",
//     "Number of Actual Offenses Grand Total": "00000",
//     "Total Offenses Cleared Commercial Sex Acts": "00000",
//     "Total Offenses Cleared Involuntary Servitude": "00000",
//     "Total Offenses Cleared Grand Total": "00000",
//     "Number of Clearances Under 18 Commercial Sex Acts": "00000",
//     "Number of Clearances Under 18 Involuntary Servitude": "00000",
//     "Number of Clearances Under 18 Grand Total": "00000"
//   },
//   "3": {
//     "State": "AK",
//     "City": "ANCHORAGE",
//     "Month": "apr",
//     "Offenses Reported or Known Commercial Sex Acts": "00001",
//     "Offenses Reported or Known Involuntary Servitude": "00000",
//     "Offenses Reported or Known Grand Total": "00001",
//     "Unfounded Commercial Sex Acts": "00000",
//     "Unfounded Involuntary Servitude": "00000",
//     "Unfounded Grand Total": "00000",
//     "Number of Actual Offenses Commercial Sex Acts": "00001",
//     "Number of Actual Offenses Involuntary Servitude": "00000",
//     "Number of Actual Offenses Grand Total": "00001",
//     "Total Offenses Cleared Commercial Sex Acts": "00000",
//     "Total Offenses Cleared Involuntary Servitude": "00000",
//     "Total Offenses Cleared Grand Total": "00000",
//     "Number of Clearances Under 18 Commercial Sex Acts": "00000",
//     "Number of Clearances Under 18 Involuntary Servitude": "00000",
//     "Number of Clearances Under 18 Grand Total": "00000"
//   },
//   "4": {
//     "State": "AK",
//     "City": "ANCHORAGE",
//     "Month": "may",
//     "Offenses Reported or Known Commercial Sex Acts": "00000",
//     "Offenses Reported or Known Involuntary Servitude": "00000",
//     "Offenses Reported or Known Grand Total": "00000",
//     "Unfounded Commercial Sex Acts": "00000",
//     "Unfounded Involuntary Servitude": "00000",
//     "Unfounded Grand Total": "00000",
//     "Number of Actual Offenses Commercial Sex Acts": "00000",
//     "Number of Actual Offenses Involuntary Servitude": "00000",
//     "Number of Actual Offenses Grand Total": "00000",
//     "Total Offenses Cleared Commercial Sex Acts": "00000",
//     "Total Offenses Cleared Involuntary Servitude": "00000",
//     "Total Offenses Cleared Grand Total": "00000",
//     "Number of Clearances Under 18 Commercial Sex Acts": "00000",
//     "Number of Clearances Under 18 Involuntary Servitude": "00000",
//     "Number of Clearances Under 18 Grand Total": "00000"
//   }
// };

export default class App extends Component {
  constructor(props) {
    super(props);
    this.dataContainer = React.createRef();
  } 

  // componentDidMount() {
  //   const testData =     [{
  //   "Offenses Reported or Known Commercial Sex Acts": 0,
  //   "Offenses Reported or Known Involuntary Servitude": 1,
  //   "Offenses Reported or Known Grand Total": 0,
  //   "Unfounded Commercial Sex Acts": 0,
  //   "Unfounded Involuntary Servitude": 4,
  //   "Unfounded Grand Total": 2,
  //   "Number of Actual Offenses Commercial Sex Acts": 3,
  //   "Number of Actual Offenses Involuntary Servitude": 3,
  //   "Number of Actual Offenses Grand Total": 1,
  //   "Total Offenses Cleared Commercial Sex Acts": 0,
  //   "Total Offenses Cleared Involuntary Servitude": 5,
  //   "Total Offenses Cleared Grand Total": 1,
  //   "Number of Clearances Under 18 Commercial Sex Acts": 3,
  //   "Number of Clearances Under 18 Involuntary Servitude": 2,
  //   "Number of Clearances Under 18 Grand Total": 0}];
    // const testData = [["test", 12], ["test2", 34], ["test3", 1], ["test4", 45], 0, 1, 2, 56, 12, 23, 12, 75, 15, 54, 21, 56];
    // const testData = [["test", 12], ["test2", 34], ["test3", 1], ["test4", 45]];

  //   const width = window.innerWidth / 2;
  //   const height = window.innerHeight / 3;
  //   let svg = d3.select(this.dataContainer.current)
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", height);

  //   // const rectWidth = (width / 90) - 5;
  //   const rectWidth = (width / 32) - 10;
  //   svg.selectAll("rect")
  //     .data(testData)
  //     .enter()
  //     .append("rect")
  //     .attr("x", (d, i) => 5 + i * (rectWidth + 2))
  //     .attr("y", d => height - d)
  //     .attr("width", rectWidth)
  //     .attr("height", d => d)
  //     .attr("fill", "#fff")
  //     .text(d => console.log(d3.value(d)))
  //     .attr("color", "pink");
  // }

  render() {
    return (
        <div className="App">
          {/* <Map /> */}
          <Shape />
        </div>
      );
    }
  }
