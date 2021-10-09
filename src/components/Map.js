import React from 'react';
import {useState, useCallback} from 'react';
import '../App.css';
import * as turf from '@turf/turf';
import MapGL, {Layer, Source} from 'react-map-gl';
import tribalLands from '../data/tribal-geojson.json';
import petroleumPipelines from '../data/petroleumproduct_pipelines_nov2014.json';
import crudeOilPipelines from '../data/crudeoil_pipelines_nov2014.json';
import Brownfields from '../data/re_atlas-epa_brownfields.json';

import './Map.css';

export default function Map(props) {
    const {mapStyle, accessToken} = props;

    // test
    // note: layer visibility is: 'visible' || 'none'
    let [petroleumLayerVisibility, togglePetroleumLayerVisibility] = useState('visible');
    let [crudeLayerVisibility, toggleCrudeLayerVisibility] = useState('visible');
    let [brownFieldsLayerVisibility, toggleBrownFieldsLayerVisibility] = useState('visible');
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
            "fill-color": "#FF0DEF",
            "fill-opacity": {
                "stops":[
                    [3,.5],
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

    const petroleumLayerVisibilityStyles = {
        id: "petrol-line",
        type: "line",
        paint: {
            "line-color": "dodgerblue",
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
            "line-color": "orange",
            //B026FF
            "line-opacity": 0.6,
            "line-width": 1.3,
        }
    };

    const BrownfieldsLayerStyles = {
        id: "brownfields",
        type: "circle",
        paint: {
            "circle-color": "#ffff00",
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

    const onMapDidLoad = useCallback( (event) => {
        const map = event.target;
        map.setTerrain({source: 'mapbox-dem', exaggeration: 5});
    }, []);

    // handle mouse onHover events
    const onHover = useCallback( (event) => {
    const {
        features,
        srcEvent: {offsetX, offsetY}
    } = event;
    const hoveredFeature = features[0] && features[0].properties;
    let name;
    let area;
    if (hoveredFeature) {
        name = features[0].properties.namelsad;
        area = (turf.area(features[0].geometry) / 2590000).toFixed(0);
    } 

    setHoverInfo(
        hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
            name: name ?? 'Tribal Name',
            area: area ?? '0.000',
            }
        : null
    );
    }, []);

    // test toggle layer visibility
    const toggleLayerVisibility = (event) => {
        const id = event.target.id;

        switch(id) {
            case 'petroleum-click':
                if (petroleumLayerVisibility === 'visible') {
                    togglePetroleumLayerVisibility('none');
                } else {
                    togglePetroleumLayerVisibility('visible');
                }
                break;
            case 'crude-click':
                if (crudeLayerVisibility === 'visible') {
                    toggleCrudeLayerVisibility('none');
                } else {
                    toggleCrudeLayerVisibility('visible');
                }    
                break;
            default:
                if (brownFieldsLayerVisibility === 'visible') {
                    toggleBrownFieldsLayerVisibility('none');
                } else {
                    toggleBrownFieldsLayerVisibility('visible');
                }
                break;
        }
    }

    return (
        <>
        <MapGL 
            mapboxApiAccessToken={accessToken} 
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onLoad={onMapDidLoad}
            mapStyle={mapStyle}
            onHover={onHover}
            {...viewport}>
                <Source {...terrainStyles} />
                <Layer {...skyLayer} />
                <Source type="geojson" data={tribalLands}>
                    <Layer {...tribalLandsLayerStyles} />
                </Source>
                <Source type="geojson" data={petroleumPipelines}>
                    <Layer {...petroleumLayerVisibilityStyles} visibility={petroleumLayerVisibility} />
                </Source>
                <Source type="geojson" data={crudeOilPipelines}>
                    <Layer {...crudeOilLayerStyles} visibility={crudeLayerVisibility} />
                </Source> 
                <Source type="geojson" data={Brownfields}>
                    <Layer {...BrownfieldsLayerStyles} visibility={brownFieldsLayerVisibility} />
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
                <div className="miscInfo">Land Area <span> [ mi<sup>2 </sup> ]</span>:  {hoverInfo.area}</div>
            </div>
        )}
        </>
    )
}