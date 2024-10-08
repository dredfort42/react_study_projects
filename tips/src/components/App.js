import { useState } from 'react';
import Bill from './Bill';
import ServiceMark from './ServiceMark';
import Total from './Total';
import Reset from './Reset';

function App() {
    const [bill, setBill] = useState(0);
    const [myMark, setMyMark] = useState(0);
    const [friendsMark, setFriendsMark] = useState(0);

    const tips = (bill * (myMark + friendsMark)) / 200;

    function handleReset() {
        if (window.confirm('are you shure?')) {
            setBill(0);
            setMyMark(0);
            setFriendsMark(0);
        }
    }

    return (
        <div className="App">
            <Bill bill={bill} setBill={setBill} />
            <ServiceMark mark={myMark} setMark={setMyMark}>
                My service mark
            </ServiceMark>
            <ServiceMark mark={friendsMark} setMark={setFriendsMark}>
                My friend service mark
            </ServiceMark>
            {bill !== 0 && (
                <>
                    <Total bill={bill} tips={tips} />
                    <Reset onClick={handleReset} />
                </>
            )}
        </div>
    );
}

export default App;
