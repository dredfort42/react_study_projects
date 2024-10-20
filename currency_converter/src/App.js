import { useState, useEffect } from 'react';
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('EUR');
    const [rate, setRate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
            const controller = new AbortController();

            async function getRate() {
                try {
                    setIsLoading(true);
                    const res = await fetch(
                        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
                        { signal: controller.signal }
                    );

                    const data = await res.json();
                    setRate(data.rates[to]);
                } catch (err) {
                    if (err.message.includes('AbortError')) {
                        alert(err.Name);
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            if (from === to) {
                setRate(amount);
                return;
            }

            getRate();

            return function () {
                controller.abort();
            };
        },
        [amount, from, to]
    );

    return (
        <div>
            <input
                disabled={isLoading}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                type="text"
            />
            <select
                disabled={isLoading}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select
                disabled={isLoading}
                value={to}
                onChange={(e) => setTo(e.target.value)}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{isLoading ? 'Loading...' : `${rate} ${to}`}</p>
        </div>
    );
}
