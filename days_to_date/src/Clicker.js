function Clicker({ text, value, setValue, step }) {
    return (
        <div>
            <button onClick={() => setValue((value) => value - step)}>-</button>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />
            <button onClick={() => setValue((value) => value + step)}>+</button>
        </div>
    );
}

export default Clicker;
