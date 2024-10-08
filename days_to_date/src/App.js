import React, { useState } from 'react';
import Clicker from './Clicker';
import Slider from './Slider';
import style from './App.module.css';

function App() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    function handleReset() {
        setStep(1);
        setCount(0);
    }

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + count * step);

    return (
        <div className={style.App}>
            <Slider text="Step" value={step} setValue={setStep} />
            <Clicker
                text="Count"
                value={count}
                setValue={setCount}
                step={step}
            />
            <p>
                {step === 0 ?? ''}
                {step > 0 ?? 'next '}
                {step < 0 ?? 'previous '}
                step {step} and count is {count} / Date{' '}
                {currentDate.toISOString()}
            </p>
            {(step !== 1 || count !== 0) && (
                <button onClick={handleReset}>Reset</button>
            )}
        </div>
    );
}

export default App;
