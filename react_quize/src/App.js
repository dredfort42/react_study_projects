import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
    questions: [],
    // loading, error, ready, active, finished
    status: 'loading',
};

function reducer(state, action) {
    console.log(state, action);
    switch (action.type) {
        case 'questions':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        // case 'ready':
        //     return { ...state, status: 'ready' };
        case 'err':
            return {
                ...state,
                status: 'error',
            };
        // throw new Error(action.payload);

        default:
            throw new Error('Unknown action');
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        async function getQuestion() {
            try {
                const res = await fetch('http://localhost:8000/questions');
                const data = await res.json();
                console.log(data);
                dispatch({ type: 'questions', payload: data });
            } catch (err) {
                console.log(err);
                dispatch({ type: 'err' });
            } finally {
                console.log('downloan finished');
                // dispatch({ type: 'ready' });
            }
        }

        getQuestion();
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                <p>1/15</p>
                <p>Questions?</p>
            </Main>
        </div>
    );
}

export default App;
