import React, { useState } from 'react';
import { quizData } from '../data/quizdata';
import '../styles/quiz.css';
import correctImage from '../assets/img2.png';
import incorrectImage from '../assets/img.png';

interface QuizProps {
    onQuizEnd: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onQuizEnd }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerOptionClick = (answer: string) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            const isCorrect = answer === quizData[currentQuestion].correctAnswer;
            setFeedback(isCorrect ? 'correct' : 'incorrect');
            if (isCorrect) {
                setScore(score + 1);
            }
            setIsAnswered(true);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setFeedback(null);
            setIsAnswered(false);
        } else {
            alert(`Fin du quiz. Votre score est de ${score}/${quizData.length}`);
            onQuizEnd();
        }
    };

    return (
        <div className="quiz">
            <div className="question-section">
                <h2>{quizData[currentQuestion].question}</h2>
            </div>

            <div className="options-section">
                {quizData[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerOptionClick(option)}
                        className={`${selectedAnswer === option ? 'selected' : ''} ${feedback === 'incorrect' && option === quizData[currentQuestion].correctAnswer ? 'correct-answer' : ''}`}
                        disabled={isAnswered}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {feedback && (
                <div className="reveal-section">
                    <img
                        src={feedback === 'correct' ? correctImage : incorrectImage}
                        alt={feedback === 'correct' ? 'Bonne réponse' : 'Mauvaise réponse'}
                    />
                    <p>{feedback === 'correct' ? "Bonne réponse !" : "Mauvaise réponse !"}</p>
                    <button onClick={handleNextQuestion}>Question suivante</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;