import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapElement = ({lat, lng}: any) => {
    const [viewState, setViewState] = useState({
        longitude: lng,
        latitude: lat,
        zoom: 2
    });

    useEffect(() => {
        setViewState({
            longitude: lng,
            latitude: lat,
            zoom: 2
        })
    }, [lat, lng])
    
    return (
        <Map
            {...viewState}
            mapboxAccessToken="pk.eyJ1IjoieWFsdGFtaXJhbm9hIiwiYSI6ImNrZmQ2NnB3ejAzZ3AyeW1xeHE1ejc5cWMifQ.179Yy6B7zkJ5eojBcyf77g"
            onMove={evt => setViewState(evt.viewState)}
            style={{width: 600, height: 400}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={lng} latitude={lat} anchor="bottom" >
                <span className="material-symbols-outlined">location_on</span>
            </Marker>
        </Map>
    )
}

export default MapElement;