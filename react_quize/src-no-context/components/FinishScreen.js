export default function FinishScreen({
    points,
    totalPoints,
    highscore,
    dispatch,
}) {
    const precentage = Math.ceil((points / totalPoints) * 100);

    let emoji;
    if (precentage === 100) emoji = '🥇';
    if (precentage < 100 && precentage <= 80) emoji = '🥈';
    if (precentage < 80 && precentage <= 60) emoji = '🥉';
    if (precentage < 60 && precentage <= 40) emoji = '🏅';
    if (precentage < 40) emoji = '🫣';

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
                {totalPoints} ({precentage}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'restart' })}
            >
                Restart quize
            </button>
        </>
    );
}
