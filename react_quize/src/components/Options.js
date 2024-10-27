export default function Options({ question, dispatch, answer }) {
    return (
        <div className="options">
            {question.options.map((option, i) => (
                <button
                    className={`btn btn-option ${
                        i === answer ? 'answer' : ''
                    } ${
                        answer
                            ? i === question.correctOption
                                ? 'correct'
                                : 'wrong'
                            : ''
                    }`}
                    disabled={answer !== null}
                    key={option}
                    onClick={() => dispatch({ type: 'answer', payload: i })}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
