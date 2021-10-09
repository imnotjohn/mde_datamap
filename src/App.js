import './App.css';
import React from 'react';
import {Component} from 'react';
import Map from './components/Map';

const MAP_STYLE = 'mapbox://styles/imnotjohn/ckuhsj2db8d2u17mkddjxft02';
const ACCESS_TOKEN = 'pk.eyJ1IjoiaW1ub3Rqb2huIiwiYSI6ImNqZ3RzNjdhdjB2a20ycXE5dHR3ODY2MGcifQ.mEpkk9ZAI1ncdwAOVDdYdw'

export default class App extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
        <div className="App">
          <Map accessToken={ACCESS_TOKEN} mapStyle={MAP_STYLE} />
        </div>
      );
    }
  }
