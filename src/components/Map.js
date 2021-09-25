import React, { useEffect } from 'react';
import {useState, useCallback} from 'react';
import '../App.css';
import MapGL, {Layer, Source} from 'react-map-gl';
import tribalLands from '../data/tribal-geojson.json';
import petroleumPipelines from '../data/petroleumproduct_pipelines_nov2014.json';
import crudeOilPipelines from '../data/crudeoil_pipelines_nov2014.json';

export default function Map() {
    const accessToken = "pk.eyJ1IjoiaW1ub3Rqb2huIiwiYSI6ImNqZ3RzNjdhdjB2a20ycXE5dHR3ODY2MGcifQ.mEpkk9ZAI1ncdwAOVDdYdw";

    let [tribalLandIsVisible, toggleTribalLandIsVisible] = useState(true);
    let [petroleumIsVisible, togglePetroleumIsVisible] = useState(true);
    let [crudeOilIsVisible, toggleCrudeOilIsVisible] = useState(true);

    const _handleKeyDown = (event) => {
        switch(event.key) {
            case "1":
                toggleTribalLandIsVisible(!tribalLandIsVisible);
                break;
            case "2":
                togglePetroleumIsVisible(!petroleumIsVisible);
                break;
            case "3":
                toggleCrudeOilIsVisible(!crudeOilIsVisible);
                break;
            default:
                break;
        }
    }

    useEffect( () => {
        window.addEventListener("keydown", _handleKeyDown);
        return () => {
            window.removeEventListener("keydown", _handleKeyDown);
        }
    }, [tribalLandIsVisible, petroleumIsVisible, crudeOilIsVisible]);

    let [viewport, setViewport] = useState({
            bearing: 0,
            width: "100vw",
            height: "100vh",
            latitude: 37.7577,
            longitude: -122.4376,
            minZoom: 6,
            maxZoom: 12,    
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
            "fill-color": "#ff0090",
            "fill-opacity": 0.3,
        }
    };

    const petroleumLayerStyles = {
        id: "petrol-line",
        type: "line",
        paint: {
            "line-color": "#FF6700",
            "line-opacity": 0.5,
            "line-width": 2,
        }
    };

    const crudeOilLayerStyles = {
        id: "crude-line",
        type: "line",
        paint: {
            "line-color": "#B026FF",
            "line-opacity": 0.5,
            "line-width": 2,
        }
    };

    const onMapDidLoad = useCallback(event => {
        const map = event.target;
        map.setTerrain({source: 'mapbox-dem', exaggeration: 5});
      }, []);

    return (
        <MapGL 
            mapboxApiAccessToken={accessToken} 
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onLoad={onMapDidLoad}
            // mapStyle="mapbox://styles/mapbox/satellite-v9"
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
        </MapGL>
    )
}