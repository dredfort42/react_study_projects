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

const SECONDS_PER_QUESTION = 20;

const initialState = {
    questions: [],
    // loading, error, ready, active, finished
    status: 'loading',
    qIndex: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'questions':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        case 'err':
            return {
                ...state,
                status: 'error',
            };
        case 'active':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
            };
        case 'answer':
            const question = state.questions.at(state.qIndex);

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                qIndex: state.qIndex + 1,
                answer: null,
            };
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore:
                    state.highscore > state.points
                        ? state.highscore
                        : state.points,
            };
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                highscore: state.highscore,
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? 'finished' : state.status,
            };

        default:
            throw new Error('Unknown action');
    }
}

function App() {
    const [
        {
            questions,
            status,
            qIndex,
            answer,
            points,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(function () {
        async function getQuestion() {
            try {
                const res = await fetch('http://localhost:8000/questions');
                const data = await res.json();
                // console.log(data);
                dispatch({ type: 'questions', payload: data });
            } catch (err) {
                dispatch({ type: 'err' });
            }
            // finally {
            //     console.log('downloan finished');
            //     // dispatch({ type: 'ready' });
            // }
        }

        getQuestion();
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            qIndex={qIndex}
                            numQuestions={numQuestions}
                            points={points}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[qIndex]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                qIndex={qIndex}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishScreen
                        points={points}
                        totalPoints={totalPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
