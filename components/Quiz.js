import styles from '../styles/Quiz.module.scss';
import { useState, useEffect } from 'react';
export default function Quiz({ dictionary }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsList.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const startQuiz = () => {
    let questionsArray = [];
    Object.values(dictionary).forEach((line) => questionsArray.push(...line));
    let questionAnswer = [];
    console.log(questionsArray);

    for (let i = 0; i < questionsArray.length; i++) {
      let randomInteger = Math.floor(Math.random() * 4);
      let answerArray = [
        { answerText: questionsArray[i].english, isCorrect: true },
        // { answerText: questionsArray[i - 1].english, isCorrect: false },
        // { answerText: questionsArray[i - 2].english, isCorrect: false },
        // { answerText: questionsArray[i + 1].english, isCorrect: false },
      ];
      questionAnswer.push({
        questionText: questionsArray[i].french,
        answerOptions: answerArray,
      });
    }
    console.log(questionAnswer);
    setQuestionsList(questionAnswer);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={startQuiz}>Click</button>
        {questionsList.length}
        {showScore ? (
          <div className={styles.scoreSection}>
            You scored {score} out of {questionsList.length}
          </div>
        ) : (
          <>
            <div className={styles.questionSection}>
              <div className={styles.questionCount}>
                <span>Question {currentQuestion + 1}</span>/
                {questionsList.length}
              </div>
              <div className={styles.questionText}>
                {questionsList[currentQuestion].questionText}
              </div>
            </div>
            <div className={styles.answerSection}>
              {questionsList[currentQuestion].answerOptions.map(
                (answerOption) => (
                  <button
                    className={styles.button}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
