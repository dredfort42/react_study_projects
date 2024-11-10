import { useQuiz } from '../contexts/QuizContext';

export default function Options() {
    const { questions, qIndex, dispatch, answer } = useQuiz();
    const question = questions.at(qIndex);

    return (
        <div className="options">
            {question.options.map((option, i) => (
                <button
                    className={`btn btn-option ${
                        answer
                            ? i === question.correctOption
                                ? 'correct'
                                : 'wrong'
                            : ''
                    } ${i === answer ? 'answer' : ''}`}
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
