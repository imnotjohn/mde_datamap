import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import '../App.css';
import * as turf from '@turf/turf';
import MapGL, {Layer, Source, FlyToInterpolator} from 'react-map-gl';
import tribalLands from '../data/tribal-geojson.json';
import petroleumPipelines from '../data/petroleumproduct_pipelines_nov2014.json';
import crudeOilPipelines from '../data/crudeoil_pipelines_nov2014.json';
import Brownfields from '../data/browns_no_zeros.json';
import BrownfieldZeros from '../data/browns_zeros.json';

import * as d3 from 'd3-ease';
import Legend from './Legend.js';
import './Map.css';

const COLORS = {
    tribal: '#fc00aa',
    //tribal: '#FF0DEF',
    brownfields: '#ffff00',
    emptydata: '#ffff00',
    petroleum: 'dodgerblue',
    crudeoil: '#3CE9FF',
};

export default function Map(props) {
    const {mapStyle, accessToken} = props;

    // test
    // note: layer visibility is: 'visible' || 'none'
    // let [petroleumLayerVisibility, togglePetroleumLayerVisibility] = useState('visible');
    // let [crudeLayerVisibility, toggleCrudeLayerVisibility] = useState('visible');
    // let [brownFieldsLayerVisibility, toggleBrownFieldsLayerVisibility] = useState('visible');
    // end test

    let [hoverInfo, setHoverInfo] = useState(null);
    let [viewport, setViewport] = useState({
            bearing: 0,
            width: "100vw",
            height: "100vh",
            latitude: 37.0902, // center of US
            longitude: -99.7129, // center of US
            minZoom: 3, // represents zoom out
            maxZoom: 18, // represents zoom in    
            pitch: 25,
            zoom: 4.75,
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
            "fill-color": COLORS.tribal,
            "fill-opacity": {
                "stops":[
                    [3,.6],
                    [18,.01]
                ]
            }
        }
    };

    const petroleumLayerVisibilityStyles = {
        id: "petrol-line",
        type: "line",
        paint: {
            "line-color": COLORS.petroleum,
            // #FF6700
            // #FF0DEF
            "line-opacity": 0.6,
            "line-width": 1.3,
        }
    };

    const crudeOilLayerStyles = {
        id: "crude-line",
        type: "line",
        paint: {
            "line-color": COLORS.crudeoil,
            //B026FF
            "line-opacity": 0.6,
            "line-width": 1.3,
        }
    };

    const BrownfieldsLayerStyles = {
        id: "brownfields",
        type: "circle",
        paint: {
            "circle-color": COLORS.brownfields,
            "circle-opacity": 0.45,
            "circle-radius" : ["interpolate",
                    ["linear"], 
                    ["zoom"],
                    3,
                    [
                        "interpolate",
                        ["exponential", 2],
                        ["get", "mapped_acr"],
                        0, 1,
                        1100000, 1,
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

    const BrownfieldZerosLayerStyles = {
        id: "brownfieldszeros",
        type: "symbol",
        source: "points",
        paint: {
            "text-color": "#FFFF00",
            "text-opacity": 0.45,
        },
        layout: {
            "text-field": "✖", // lighter weight: ✕ 
            "text-size": 20,
        }
    }

    const useKeyPress = (targetKey) => {
        // State for keeping track of whether key is pressed
        const [keyPressed, setKeyPressed] = useState(false);
        // If pressed key is our target key then set to true
        function downHandler({ key }) {
          if (key === targetKey) {
            setKeyPressed(true);
            console.log(targetKey);

            switch(key) {
                case '1':
                    setViewport({
                        ...viewport,
                        longitude: -74.1,
                        latitude: 40.7,
                        zoom: 14,
                        transitionDuration: 5000,
                        transitionInterpolator: new FlyToInterpolator(),
                        transitionEasing: d3.easeCubic                        
                    })
                    break;
                case '2':
                    setViewport({
                        bearing: 0,
                        width: "100vw",
                        height: "100vh",
                        latitude: 37.0902, // center of US
                        longitude: -99.7129, // center of US
                        minZoom: 3, // represents zoom out
                        maxZoom: 18, // represents zoom in    
                        pitch: 25,
                        transitionDuration: 5000,
                        transitionInterpolator: new FlyToInterpolator(),
                        transitionEasing: d3.easeCubic,
                        zoom: 4.75,
                    })
                    break;
                case '3':
                    setViewport({
                        ...viewport,
                        longitude: -74.1,
                        latitude: 40.7,
                        zoom: 14,
                        bearing: 30,
                        transitionDuration: 5000,
                        transitionInterpolator: new FlyToInterpolator(),
                        transitionEasing: d3.easeCubic                        
                    })
                    break;
                default:
                    break;
            }
          }
        }
        // If released key is our target key then set to false
        const upHandler = ({ key }) => {
          if (key === targetKey) {
            setKeyPressed(false);
          }
        };
        // Add event listeners
        useEffect(() => {
          window.addEventListener("keydown", downHandler);
          window.addEventListener("keyup", upHandler);
          // Remove event listeners on cleanup
          return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
          };
        }, []); // Empty array ensures that effect is only run on mount and unmount
        return keyPressed;
    }

    const onMapDidLoad = useCallback( (event) => {
        const map = event.target;
        map.setTerrain({source: 'mapbox-dem', exaggeration: 5});
    }, []);

    const site1 = useKeyPress("1");
    const site2 = useKeyPress("2");
    const site3 = useKeyPress("3");

    // handle mouse onHover events
    const onHover = useCallback( (event) => {
    const {
        features,
        srcEvent: {offsetX, offsetY}
    } = event;
    
    let name;
    let area;
    const hoveredFeature = features[0] && (features[0].properties.namelsad || features[0].properties.site_name || features[0].properties.opername);

    // console.log(features[0]);

    if (features[0]) {
        if (features[0].properties.site_name) {
            name = features[0].properties.site_name;
            area = 'Program Type: ' + features[0].properties.program;
        }
        if (features[0].properties.namelsad) {
            name = features[0].properties.namelsad;
            area = 'Land Area: ' + (turf.area(features[0].geometry) / 2590000).toFixed(0) + ' square miles';
        }
        if (features[0].properties.opername) {
            name = features[0].properties.pipename;
            area = 'Operator: ' + features[0].properties.opername;
        }
    }

    // if (hoveredFeature) {
    //     name = features[0].properties.namelsad ?? features[0].properties.site_name;
    //     area = features[0].properties.program ? 'Program Type: ' +  features[0].properties.program : 'Land Area: ' + (turf.area(features[0].geometry) / 2590000).toFixed(0);
    // } 

    setHoverInfo(
        hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
            name: name.toLowerCase(),
            area: area,
            }
        : null
    );
    }, []);

    // handle mouse move events
    const onMouseMove = useCallback( (event) => {
        console.log(JSON.stringify(event.lngLat));
    })

    // test toggle layer visibility
    // const toggleLayerVisibility = (event) => {
    //     const id = event.target.id;

    //     switch(id) {
    //         case 'petroleum-click':
    //             if (petroleumLayerVisibility === 'visible') {
    //                 togglePetroleumLayerVisibility('none');
    //             } else {
    //                 togglePetroleumLayerVisibility('visible');
    //             }
    //             break;
    //         case 'crude-click':
    //             if (crudeLayerVisibility === 'visible') {
    //                 toggleCrudeLayerVisibility('none');
    //             } else {
    //                 toggleCrudeLayerVisibility('visible');
    //             }    
    //             break;
    //         default:
    //             if (brownFieldsLayerVisibility === 'visible') {
    //                 toggleBrownFieldsLayerVisibility('none');
    //             } else {
    //                 toggleBrownFieldsLayerVisibility('visible');
    //             }
    //             break;
    //     }
    // }

    return (
        <>
        <MapGL 
            mapboxApiAccessToken={accessToken} 
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onLoad={onMapDidLoad}
            mapStyle={mapStyle}
            onHover={onHover}
            onMouseMove={onMouseMove}
            {...viewport}>
                <Source {...terrainStyles} />
                <Layer {...skyLayer} />
                <Source type="geojson" data={tribalLands}>
                    <Layer {...tribalLandsLayerStyles} />
                </Source>
                <Source type="geojson" data={petroleumPipelines}>
                    <Layer {...petroleumLayerVisibilityStyles} />
                </Source>
                <Source type="geojson" data={crudeOilPipelines}>
                    <Layer {...crudeOilLayerStyles} />
                </Source> 
                <Source type="geojson" data={Brownfields}>
                    <Layer {...BrownfieldsLayerStyles} />
                </Source>
                <Source type="geojson" data={BrownfieldZeros}>
                    <Layer {...BrownfieldZerosLayerStyles} />
                </Source>
        </MapGL>
        {/* <div className='Controller'>
            <button id="petroleum-click" onClick={toggleLayerVisibility}>1</button>
            <button id="crude-click" onClick={toggleLayerVisibility}>2</button>
            <button id="brownfields-click" onClick={toggleLayerVisibility}>3</button>
        </div> */}
        {hoverInfo && (
            <div className="Tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
                <div className="tribeName">{hoverInfo.name}</div>
                <div className="miscInfo">{hoverInfo.area}</div>
            </div>
        )}
        <Legend colors={COLORS} />
        </>
    )
}