import React from 'react';
import ReactDOM from 'react-dom/client';
import Rating from './Rating';
import { useState } from 'react';

function Test() {
    const [rating, setRating] = useState(0);
    return (
        <>
            <Rating maxRating={7} onSetRating={setRating} />
            <p>Rating: {rating}</p>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Rating maxRating={5} />
        <Rating
            maxRating={5}
            defaultRating={3}
            size={54}
            color="brown"
            messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']}
        />
        <Rating maxRating={10} size={24} color="#0a0" />
        <Test />
    </React.StrictMode>
);
