function Total({ bill, tips }) {
    return <h2>{`Total: ${bill + tips} (${bill} bill + ${tips} tips)`}</h2>;
}

export default Total;
