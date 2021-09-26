import React, {Component} from 'react';
import * as d3 from 'd3';
// import geoJSONObj from 'topojson-client';
import tribalLands from '../data/tribal-geojson.json';

export default class Shape extends Component {
    constructor(props) {
        super(props);    
        this.containerRef = React.createRef();
    }


    componentDidMount() {
        const geojson = d3.json(tribalLands);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const projection = d3.geoEquirectangular();

        let svg = d3.select(this.containerRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("rect")
            .data(geojson.features)
            .enter()
            .append("rect")
            .attr("x", (d, i) => 50 * i)
            .attr("y", d => d)
            .attr("fill", "#fff")
            .attr("color","pink");

        console.log(geojson);
    }

    render() {
        return (
            <div className="App" ref={this.containerRef}>
                <h3>
                    hello
                </h3>
            </div>
        );
    }
}