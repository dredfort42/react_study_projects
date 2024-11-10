import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 20;
const API_URL = 'http://localhost:8000/questions';

const initialState = {
    questions: [],
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

function QuizProvider({ children }) {
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
                const res = await fetch(API_URL);
                const data = await res.json();
                dispatch({ type: 'questions', payload: data });
            } catch (err) {
                dispatch({ type: 'err' });
            }
        }

        getQuestion();
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                qIndex,
                answer,
                points,
                highscore,
                secondsRemaining,
                numQuestions,
                totalPoints,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);

    if (context === undefined) {
        throw new Error('QuizContext was used outside of the QuizProvider...');
    }

    return context;
}

export { QuizProvider, useQuiz };
