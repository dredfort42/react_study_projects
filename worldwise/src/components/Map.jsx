import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([51.51, -0.12]);
    const { cities } = useCities();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeolocation();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(
        function () {
            if (mapLat && mapLng) {
                setMapPosition([mapLat, mapLng]);
            }
        },
        [mapLat, mapLng]
    );

    useEffect(
        function () {
            if (geoLocationPosition) {
                setMapPosition([
                    geoLocationPosition.lat,
                    geoLocationPosition.lng,
                ]);
            }
        },
        [geoLocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? 'Loading...' : 'Use your position'}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={7}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();

    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}
