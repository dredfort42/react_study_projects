import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Progress from './Progress';
import Question from './Question';
import Timer from './Timer';
import NextButton from './NextButton';
import Footer from './Footer';
import FinishScreen from './FinishScreen';
import { useQuiz } from '../contexts/QuizContext';

function App() {
    const { status } = useQuiz();

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen />}
                {status === 'active' && (
                    <>
                        <Progress />
                        <Question />
                        <Footer>
                            <Timer />
                            <NextButton />
                        </Footer>
                    </>
                )}
                {status === 'finished' && <FinishScreen />}
            </Main>
        </div>
    );
}

export default App;
