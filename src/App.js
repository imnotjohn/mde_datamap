import './App.css';
import React from 'react';
import {Component} from 'react';
import Map from './components/Map';
import Caroline from './components/Caroline';


export default class App extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
        <div className="App">\
          <Map />
        </div>
      );
    }
  }
