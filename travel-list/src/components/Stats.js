export default function Stats({ items }) {
    const numItems = items.length;
    if (!numItems)
        return (
            <footer className="stats">
                Start adding things to your list! 👾
            </footer>
        );

    const packedItems = items.filter((i) => i.packed).length;
    const percentage = Math.round((packedItems / numItems) * 100);
    return (
        <footer className="stats">
            <em>
                {percentage === 100
                    ? 'Well done!'
                    : `You have ${numItems} items on your list, and you already packed  ${packedItems} (${percentage}%)`}
            </em>
        </footer>
    );
}
