export default function Progress({
    qIndex,
    numQuestions,
    points,
    totalPoints,
    answer,
}) {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={qIndex + Number(answer !== null)}
            />
            <p>
                Question <strong>{qIndex + 1}</strong>/{numQuestions}
            </p>
            <p>
                <strong>{points}</strong>/{totalPoints}
            </p>
        </header>
    );
}
