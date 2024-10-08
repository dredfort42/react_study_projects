function Bill({ bill, setBill }) {
    return (
        <div>
            <label>How much was the bill?</label>
            <input
                value={bill}
                type="number"
                onChange={(e) => setBill(Number(e.target.value))}
            ></input>
        </div>
    );
}

export default Bill;
