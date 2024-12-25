import styled from 'styled-components';

const H1 = styled.h1`
    font-size: 30px;
    font-weight: 600;
    background-color: yellow;
`;

const Button = styled.button`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    border: none;
    border-radius: 7px;
    background-color: purple;
    color: white;
    cursor: pointer;
    margin: 20px;
`;

const Input = styled.input`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0.8rem 1.2rem;
    margin: 20px;
`;

const StyledApp = styled.div`
    background-color: orangered;
    padding: 20pxs;
`;

function App() {
    return (
        <StyledApp>
            <H1>The Wild Oasis</H1>

            <Button onClick={() => alert('Clicked 0')}>Test button 0</Button>
            <Button onClick={() => alert('Clicked 1')}>Test button 1</Button>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests 1" />
        </StyledApp>
    );
}

export default App;
