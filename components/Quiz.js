import styles from '../styles/Quiz.module.scss';
import { useState, useEffect } from 'react';
export default function Quiz({ dictionary }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  function randomInteger(min, max, i) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomIntegers(min, max, i) {
    let rand = null; //an integer
    let indexArray = [];
    while (
      (rand === null || rand === i || indexArray.includes(rand),
      indexArray.length < 3)
    ) {
      rand = Math.floor(Math.random() * (max - min + 1)) + min;

      if (rand !== i && !indexArray.includes(rand)) {
        indexArray.push(rand);
      }
    }
    return indexArray;
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

    for (let i = 0; i < questionsArray.length; i++) {
      let randomInteger1 = Math.floor(Math.random() * 4);
      let [one, two, three] = randomIntegers(0, questionsArray.length - 1, i);

      let answerArray = [
        {
          answerText: questionsArray[one].english,
          isCorrect: false,
        },
        {
          answerText: questionsArray[two].english,
          isCorrect: false,
        },
        {
          answerText: questionsArray[three].english,
          isCorrect: false,
        },
      ];
      answerArray.splice(randomInteger1, 0, {
        answerText: questionsArray[i].english,
        isCorrect: true,
      });

      questionAnswer.push({
        questionText: questionsArray[i].french,
        answerOptions: answerArray,
      });
    }

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
                {questionsList[currentQuestion] &&
                  questionsList[currentQuestion].questionText}
              </div>
            </div>
            <div className={styles.answerSection}>
              {questionsList[currentQuestion] &&
                questionsList[currentQuestion].answerOptions.map(
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
