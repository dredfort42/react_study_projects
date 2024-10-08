import React from 'react';

function Slider({ text, value, setValue }) {
    return (
        <div>
            <input
                type="range"
                min="0"
                max="10"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <span>{`${text} ${value}`}</span>
        </div>
    );
}

export default Slider;
