import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [position, setPosition] = useState([51.5, -0.12]);
    const navigate = useNavigate();

    const { cities } = useCities();

    // useEffect(function () {
    //     setPosition([searchParams.get('lat'), searchParams.get('lng')]);
    // }, []);

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={position}
                zoom={5}
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
            </MapContainer>
        </div>
    );
}
