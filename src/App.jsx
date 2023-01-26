import { useState } from "react";
import Home from "./components/Home";
import Questions from "./components/Questions";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // handling check answer button click
  function handleCheckAnswersClick() {
    const checkIfAllQuestionsAreAnswered = questions.every(
      (obj) => obj.answered
    );
    if (checkIfAllQuestionsAreAnswered) {
      setAllQuestionAnswered(true);
      setScore(questions.filter((question) => question.isAnswerCorrect).length);
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 1500);
    }
  }
  function displayMessage() {}
  // reload app if play again button is clicked
  function handlePlayAgainClick() {
    window.location.reload();
  }

  const renderQuestionComponents =
    questions &&
    questions.map((question) => (
      <Questions
        question={question}
        setQuestions={setQuestions}
        key={question.id}
        allQuestionAnswered={allQuestionAnswered}
      />
    ));

  if (!startQuiz) {
    return (
      <main className="container">
        <Home
          questions={questions}
          setQuestions={setQuestions}
          setStartQuiz={setStartQuiz}
        />
      </main>
    );
  } else {
    return (
      <main className="container">
        {renderQuestionComponents}
        <div className="result-container">
          {allQuestionAnswered && (
            <p className="result">
              You scored {score}/{questions.length} correct answers
            </p>
          )}
          {questions.length > 0 ? (
            <button
              disabled={errorMessage}
              onClick={
                !allQuestionAnswered
                  ? handleCheckAnswersClick
                  : handlePlayAgainClick
              }
              className="check-answers-btn"
            >
              {allQuestionAnswered ? "Play again" : "Check answers"}
            </button>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {errorMessage && (
          <p className="error-message">
            Please provide answers to all questions
          </p>
        )}
      </main>
    );
  }
}

export default App;
