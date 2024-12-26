import styled from 'styled-components';
import GlobalStyles from '../src/styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
    font-size: 30px;
    font-weight: 600;
    background-color: yellow;
`;

const StyledApp = styled.div`
    background-color: orangered;
    padding: 20pxs;
`;

function App() {
    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <H1>The Wild Oasis</H1>

                <Button onClick={() => alert('Clicked 0')}>
                    Test button 0
                </Button>
                <Button onClick={() => alert('Clicked 1')}>
                    Test button 1
                </Button>
                <Input type="number" placeholder="Number of guests" />
                <Input type="number" placeholder="Number of guests 1" />
            </StyledApp>
        </>
    );
}

export default App;
