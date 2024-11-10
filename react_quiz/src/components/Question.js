import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

export default function Question() {
    const { questions, qIndex } = useQuiz();
    const question = questions.at(qIndex);

    return (
        <div>
            <h4>{question.question}</h4>
            <Options />
        </div>
    );
}
