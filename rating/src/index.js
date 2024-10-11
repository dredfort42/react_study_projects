import React from 'react';
import ReactDOM from 'react-dom/client';
import Rating from './Rating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Rating maxRating={5} />
        <Rating maxRating={10} />
        <Rating />
    </React.StrictMode>
);
