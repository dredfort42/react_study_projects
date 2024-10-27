import { useState } from 'react';
import PakagingList from './PakagingList';
import Stats from './Stats';
import Form from './Form';
import Logo from './Logo';

// const initialItems = [
//     { id: 1, description: 'Passports', quantity: 2, packed: false },
//     { id: 2, description: 'Socks', quantity: 12, packed: true },
//     { id: 3, description: 'Headphones', quantity: 1, packed: false },
// ];

function App() {
    const [items, setItem] = useState([]);

    function handleAddItem(item) {
        setItem((items) => [...items, item]);
    }

    function handleRemoveItem(id) {
        setItem((items) => items.filter((i) => id !== i.id));
    }

    function handlePackedItem(id) {
        setItem((items) =>
            items.map((i) => (id === i.id ? { ...i, packed: !i.packed } : i))
        );
    }

    function handleReset() {
        if (window.confirm('Are you shure?')) {
            setItem([]);
        }
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PakagingList
                items={items}
                onRemoveItem={handleRemoveItem}
                onToogleItem={handlePackedItem}
                onReset={handleReset}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
