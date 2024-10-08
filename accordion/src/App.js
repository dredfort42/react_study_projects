import { useState } from 'react';
const faqs = [
    {
        title: 'Where are these chairs assembled?',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
    },
    {
        title: 'How long do I have to return my chair?',
        text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
    },
    {
        title: 'Do you ship to countries outside the EU?',
        text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
    },
];

function App() {
    return (
        <div className="App">
            <Accordion data={faqs} />
        </div>
    );
}

export default App;

function Accordion({ data }) {
    const [curOpen, setCurOpen] = useState(null);

    return (
        <div className="accordion">
            {data.map((e, i) => (
                <Item
                    num={i + 1}
                    title={e.title}
                    curOpen={curOpen}
                    onClick={setCurOpen}
                    key={e.title}
                >
                    {e.text}
                </Item>
            ))}
        </div>
    );
}

function Item({ num, title, curOpen, onClick, children }) {
    // const [isOpen, setIsOpen] = useState(false);
    const isOpen = num === curOpen;

    function handleToggle() {
        // setIsOpen((isOpen) => !isOpen);
        onClick(isOpen ? null : num);
    }

    return (
        <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
            <p className="number">{num}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? '-' : '+'}</p>
            {isOpen && <div className="content-box">{children}</div>}
        </div>
    );
}
