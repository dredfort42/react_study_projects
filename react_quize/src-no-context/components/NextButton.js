export default function NextButton({ dispatch, answer, qIndex, numQuestions }) {
    if (answer === null) return null;

    if (qIndex < numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'nextQuestion' })}
            >
                Next
            </button>
        );

    if (qIndex === numQuestions - 1)
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'finish' })}
            >
                Finish
            </button>
        );
}
