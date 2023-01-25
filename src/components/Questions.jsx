import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Questions({
  question,
  setQuestions,
  allQuestionAnswered,
}) {
  function handleClick(answer, id) {
    setQuestions((prevState) =>
      prevState.map((question) => {
        return question.id === id
          ? {
              ...question,
              selectedAnswer: answer,
              answered: true,
              isAnswerCorrect: question.correctAnswer === answer ? true : false,
            }
          : question;
      })
    );
  }

  const renderAnswers = question.answers.map((answer, index) => {
    let styles = {
      backgroundColor: question.selectedAnswer === answer ? "#D6DBF5" : "",
      border: question.selectedAnswer === answer ? "none" : "uset",
    };
    let classNames = "answer-btn";

    if (allQuestionAnswered) {
      styles = { border: "0.79px solid #1010104D" };
      if (question.correctAnswer === answer) {
        classNames += " correctAnswer";
        styles = {};
      } else if (
        question.selectedAnswer === answer &&
        !question.isAnswerCorrect
      ) {
        classNames += " incorrectAnswer";
        styles = {};
      }
    }

    return (
      <button
        className={classNames}
        style={styles}
        onClick={() => handleClick(answer, question.id)}
        id={index}
        key={nanoid()}
        disabled={allQuestionAnswered ? true : false}
      >
        {atob(answer)}
      </button>
    );
  });

  return (
    <div className="questions-container">
      <h3>{atob(question.question)}</h3>
      <div className="answers-container">{renderAnswers}</div>
    </div>
  );
}
