import { useState } from "react";
import Home from "./components/Home";
import Questions from "./components/Questions";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  // handling check answer button click
  function handleCheckAnswersClick() {
    let errorMessage = "";
    const checkIfAllQuestionsAreAnswered = questions.every(
      (obj) => obj.answered
    );
    if (checkIfAllQuestionsAreAnswered) {
      setAllQuestionAnswered(true);
      setScore(questions.filter((question) => question.isAnswerCorrect).length);
    } else {
      errorMessage = "e pa nece moci";
    }
    alert(errorMessage);
  }

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
          <button
            onClick={
              !allQuestionAnswered
                ? handleCheckAnswersClick
                : handlePlayAgainClick
            }
            className="check-answers-btn"
          >
            {allQuestionAnswered ? "Play again" : "Check answers"}
          </button>
        </div>
      </main>
    );
  }
}

export default App;
