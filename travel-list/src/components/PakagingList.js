import { useState } from 'react';
import Item from './Item';

export default function PakagingList({
    items,
    onRemoveItem,
    onToogleItem,
    onReset,
}) {
    const [sortBy, setSortBy] = useState('input');

    let sortedItems;
    if (sortBy === 'input') {
        sortedItems = items;
    } else if (sortBy === 'description') {
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === 'packed') {
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((e) => (
                    <Item
                        key={e.id}
                        item={e}
                        onRemoveItem={onRemoveItem}
                        onToogleItem={onToogleItem}
                    />
                ))}
            </ul>

            {items.length > 0 && (
                <div className="actions">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="input">Sort by input order</option>
                        <option value="description">
                            Sort by descrioption
                        </option>
                        <option value="packed">Sort by packed status</option>
                    </select>
                    <button onClick={onReset}>Reset</button>
                </div>
            )}
        </div>
    );
}
