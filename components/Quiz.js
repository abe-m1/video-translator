import styles from '../styles/Quiz.module.scss';
import { useState, useEffect } from 'react';

export default function Quiz({ dictionary }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  function randomIntegers(min, max, i) {
    let rand = null;
    //will contain 3 index values
    let indexArray = [];
    //run while loop
    //1. rand === null , first iteration
    //2. rand === i , if number equals i value
    //3. if rand is already in the indexArray
    //4. if the index length is less than 3
    while (
      (rand === null || rand === i || indexArray.includes(rand),
      indexArray.length < 3)
    ) {
      //generate a random number
      rand = Math.floor(Math.random() * (max - min + 1)) + min;

      //push into array
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
    //results in an array with format { english : string, french: string}
    let questionsArray = [];
    Object.values(dictionary).forEach((line) => questionsArray.push(...line));

    let questionAnswer = [];

    for (let i = 0; i < questionsArray.length; i++) {
      //generate a random number from 0 to 3, to determine in which position
      //the correct answer will be
      let randomInteger1 = Math.floor(Math.random() * 4);

      //generate 3 random index numbers
      let [one, two, three] = randomIntegers(0, questionsArray.length - 1, i);
      //create answer array with three false answers, use random index to
      //determine answers
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
      //based on random number chosen for the correct answer, splice the correct
      //answer into the array
      answerArray.splice(randomInteger1, 0, {
        answerText: questionsArray[i].english,
        isCorrect: true,
      });
      //push formatted object
      questionAnswer.push({
        questionText: questionsArray[i].french,
        answerOptions: answerArray,
      });
    }
    setQuestionsList(questionAnswer);
    setQuizStarted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {!quizStarted && (
          <div>
            <button onClick={startQuiz}>Click to start quiz</button>
            {/* {questionsList.length} */}
          </div>
        )}
        {quizStarted && (
          <div className={styles.quizContent}>
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
        )}
      </div>
    </div>
  );
}
