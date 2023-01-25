import React from "react";
// import { useEffect } from "react";

import { nanoid } from "nanoid";

export default function Home({ questions, setQuestions, setStartQuiz }) {
  function startTheQuiz() {
    setStartQuiz((prevState) => !prevState);
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple&encode=base64`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(formatDataFromTriviaApi(data.results));
      });
  }
  function formatDataFromTriviaApi(array) {
    return array.map((question) => {
      // collect all answers into array and shufle them
      let allAnswersForQuestion = shuffleArray([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);
      // return new object with nex properties
      return {
        question: question.question,
        correctAnswer: question.correct_answer,
        answers: allAnswersForQuestion,
        answered: false,
        id: nanoid(),
        isAnswerCorrect: null,
        selectedAnswer: "",
      };
    });
  }
  // for shuhhling arrays
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Quizzical</h2>
      <p className="home-desc">Some description if needed</p>
      <button onClick={startTheQuiz} className="home-btn">
        Start Quiz
      </button>
    </div>
  );
}
