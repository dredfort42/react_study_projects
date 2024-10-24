import { useState } from 'react';

function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState({});

    function getPosition() {
        if (!navigator.geolocation)
            return setError('Your browser does not support geolocation');
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { position, getPosition, isLoading, error };
}

export default function App() {
    const [countClicks, setCountClicks] = useState(0);
    const {
        position: { lat, lng },
        getPosition,
        isLoading,
        error,
    } = useGeolocation();

    function handleClick() {
        setCountClicks((count) => count + 1);
        getPosition();
    }

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                Get my position
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p>
                    Your GPS position:{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            <p>You requested position {countClicks} times</p>
        </div>
    );
}
