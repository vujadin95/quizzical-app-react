import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Questions({ question, setQuestions }) {
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
    return (
      <button
        className={"answer-btn"}
        style={{
          backgroundColor: question.selectedAnswer === answer ? "#D6DBF5" : "",
          border: question.selectedAnswer === answer ? "none" : "uset",
        }}
        onClick={() => handleClick(answer, question.id)}
        id={index}
        key={nanoid()}
      >
        {answer}
      </button>
    );
  });

  return (
    <div className="questions-container">
      <h3>{question.question}</h3>
      <div className="answers-container">{renderAnswers}</div>
    </div>
  );
}
