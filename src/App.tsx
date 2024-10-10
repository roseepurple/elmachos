import React, { useState } from 'react';
import { Intro } from './components/Intro';
import Quiz from "./components/Quiz";
import './App.css';

const App: React.FC = () => {
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const startQuiz = () => {
        setIsQuizStarted(true);
    };

    const resetQuiz = () => {
        setIsQuizStarted(false);
    };

    return (
        <div className={"App"}>
            {isQuizStarted ? <Quiz onQuizEnd={resetQuiz} /> : <Intro onClick={startQuiz} />}
        </div>
    );
};

export default App;