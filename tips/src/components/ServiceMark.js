const marks = [
    { description: 'bad', value: 0 },
    { description: 'normal', value: 5 },
    { description: 'good', value: 10 },
    { description: 'excelent', value: 20 },
];

function ServiceMark({ mark, setMark, children }) {
    return (
        <div>
            <label>{children}</label>
            <select
                value={mark}
                onChange={(e) => setMark(Number(e.target.value))}
            >
                {marks.map((e) => (
                    <option
                        value={e.value}
                        key={e.description}
                    >{`${e.description} (${e.value}%)`}</option>
                ))}
            </select>
        </div>
    );
}

export default ServiceMark;
