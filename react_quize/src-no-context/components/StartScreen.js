export default function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Weclome to the React Quiz</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'active' })}
            >
                Let's start
            </button>
        </div>
    );
}
