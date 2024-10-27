import { useState } from 'react';

export default function Form({ onAddItem }) {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (!description) {
            return;
        }

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onAddItem(newItem);

        setQuantity(1);
        setDescription('');
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
                    <option value={e} key={e}>
                        {e}
                    </option>
                ))}
            </select>
            <input
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
