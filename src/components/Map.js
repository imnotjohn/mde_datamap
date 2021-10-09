import React, { useEffect } from 'react';
import {useState, useCallback} from 'react';
import '../App.css';
import MapGL, {Layer, Source} from 'react-map-gl';
import tribalLands from '../data/tribal-geojson.json';
import petroleumPipelines from '../data/petroleumproduct_pipelines_nov2014.json';
import crudeOilPipelines from '../data/crudeoil_pipelines_nov2014.json';
import Brownfields from '../data/re_atlas-epa_brownfields.json';

import './Map.css';

export default function Map(props) {
    // const accessToken = "pk.eyJ1IjoiaW1ub3Rqb2huIiwiYSI6ImNqZ3RzNjdhdjB2a20ycXE5dHR3ODY2MGcifQ.mEpkk9ZAI1ncdwAOVDdYdw";
    const {mapStyle, accessToken} = props;

    let [viewport, setViewport] = useState({
            bearing: 0,
            width: "100vw",
            height: "100vh",
            latitude: 37.7577,
            longitude: -122.4376,
            minZoom: 3, // represents zoom out
            maxZoom: 18, // represents zoom in    
            pitch: 70,
            zoom: 8,
    });
    
    const terrainStyles = {
        color: [255, 255, 255],
        id: "mapbox-dem",
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
    }

    const skyLayer = {
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      };

    const tribalLandsLayerStyles = {
        id: "point",
        type: "fill",
        paint: {
            "fill-color": "#FF0DEF",
            "fill-opacity": {
                "stops":[
                    [3,.7],
                    [18,.1]
                ]
            }
            //"fill-opacity": ["interpolate",
            //["linear"], 
            //["zoom"],
            //3,
            //[
           //     "interpolate",
            //    ["linear"],
            //    .7,
            //],
            //18,
            //[
            //    "interpolate",
            //    ["linear"],
            //    .1,
            //],
        //]
        }
    };

    const petroleumLayerStyles = {
        id: "petrol-line",
        type: "line",
        paint: {
            "line-color": "#FF0DEF",
            //FF6700
            "line-opacity": 0.5,
            "line-width": 2,
        }
    };

    const crudeOilLayerStyles = {
        id: "crude-line",
        type: "line",
        paint: {
            "line-color": "orange",
            //B026FF
            "line-opacity": 0.5,
            "line-width": 2,
        }
    };

    const BrownfieldsLayerStyles = {
        id: "brownfields",
        type: "circle",
        paint: {
            "circle-color": "#ffff00",
            "circle-opacity": 0.8,
            "circle-radius" : ["interpolate",
                    ["linear"], 
                    ["zoom"],
                    3,
                    [
                        "interpolate",
                        ["exponential", 2],
                        ["get", "mapped_acr"],
                        0, 1,
                        1100000,1,
                    ],
                    9,
                    [
                        "interpolate",
                        ["exponential", 2],
                        ["get", "mapped_acr"],
                        0, 10,
                        1100000,200,
                    ],
                ]
        }
    };

    const onMapDidLoad = useCallback(event => {
        const map = event.target;
        map.setTerrain({source: 'mapbox-dem', exaggeration: 5});

        console.log(Brownfields);
      }, []);

    return (
        <MapGL 
            mapboxApiAccessToken={accessToken} 
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onLoad={onMapDidLoad}
            // mapStyle={'mapbox://styles/imnotjohn/ckuhsj2db8d2u17mkddjxft02'}
            mapStyle={mapStyle}
            {...viewport}>
                <Source {...terrainStyles} />
                <Layer {...skyLayer} />
                <Source type="geojson" data={tribalLands}>
                    <Layer {...tribalLandsLayerStyles} />
                </Source>
                <Source type="geojson" data={petroleumPipelines}>
                    <Layer {...petroleumLayerStyles} />
                </Source>
                <Source type="geojson" data={crudeOilPipelines}>
                    <Layer {...crudeOilLayerStyles} />
                </Source> 
                <Source type="geojson" data={Brownfields}>
                    <Layer {...BrownfieldsLayerStyles} />
                </Source>
        </MapGL>
    )
}