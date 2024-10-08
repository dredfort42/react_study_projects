import { useState } from 'react';

const initialFriends = [
    {
        id: 118836,
        name: 'Clark',
        image: 'https://i.pravatar.cc/48?u=118836',
        balance: -7,
    },
    {
        id: 933372,
        name: 'Sarah',
        image: 'https://i.pravatar.cc/48?u=933372',
        balance: 20,
    },
    {
        id: 499476,
        name: 'Anthony',
        image: 'https://i.pravatar.cc/48?u=499476',
        balance: 0,
    },
];

export default function App() {
    const [friendsList, setFriendsList] = useState(initialFriends);
    const [stateFormAddFriend, setStateFormAddFriend] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handlerNewFriendForm() {
        setStateFormAddFriend((show) => !show);
    }

    function handlerAddFriend(friend) {
        setFriendsList((friends) => [...friends, friend]);
        setStateFormAddFriend(false);
    }

    function handleFriendSelection(friend) {
        setSelectedFriend((selected) =>
            selected?.id === friend.id ? null : friend
        );
        setStateFormAddFriend(false);
    }

    function handleSplitBill(value) {
        setFriendsList((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? { ...friend, balance: friend.balance + Number(value) }
                    : friend
            )
        );
        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList
                    friendsList={friendsList}
                    selectedFriend={selectedFriend}
                    onSelect={handleFriendSelection}
                />
                {stateFormAddFriend && (
                    <FormAddFriend onAddFriend={handlerAddFriend} />
                )}
                <Button onClick={handlerNewFriendForm}>
                    {stateFormAddFriend ? 'Close' : 'Add new friend'}
                </Button>
            </div>
            {selectedFriend && (
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSubmit={handleSplitBill}
                />
            )}
        </div>
    );
}

function FriendsList({ friendsList, selectedFriend, onSelect }) {
    return (
        <ul>
            {friendsList.map((friend) => (
                <Friend
                    friend={friend}
                    selectedFriend={selectedFriend}
                    onSelect={onSelect}
                    key={friend.id}
                />
            ))}
        </ul>
    );
}

function Friend({ friend, selectedFriend, onSelect }) {
    const isSelected = selectedFriend?.id === friend.id;
    return (
        <li className={isSelected ? 'selected' : ''}>
            <h3>{friend.name}</h3>
            <img src={friend.image} alt={friend.name} />
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)} €
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you {Math.abs(friend.balance)} €
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button onClick={() => onSelect(friend)}>
                {isSelected ? 'Close' : 'Select'}
            </Button>
        </li>
    );
}

function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48');

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) return;
        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id,
        };

        onAddFriend(newFriend);

        setName('');
        setImage('https://i.pravatar.cc/48');
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>💃 Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>🌅 Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <Button>Add</Button>
        </form>
    );
}

function FormSplitBill({ selectedFriend, onSubmit }) {
    const [bill, setBill] = useState('');
    const [expense, setExpense] = useState('');
    const [payer, setPayer] = useState('you');

    const friendExpense = bill ? bill - expense : '';

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !expense) return;
        onSubmit(payer === 'you' ? friendExpense : -expense);
    }

    function handleBillChange(value) {
        setBill(value);
        setExpense((expense) => (value < expense ? value : expense));
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split the bill with {selectedFriend.name}</h2>
            <label>💰 Bill value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => handleBillChange(Number(e.target.value))}
            />

            <label>🕺🏻 Your expense</label>
            <input
                type="text"
                value={expense}
                onChange={(e) =>
                    setExpense(
                        Number(e.target.value) > bill
                            ? expense
                            : Number(e.target.value)
                    )
                }
            />

            <label>💃 {selectedFriend.name}'s expense</label>
            <input type="text" value={friendExpense} disabled />

            <label>🧾 Who is paying the bill</label>
            <select value={payer} onChange={(e) => setPayer(e.target.value)}>
                <option value="you">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>
            <Button>Split bill</Button>
        </form>
    );
}
