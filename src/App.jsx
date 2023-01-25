import { useState } from "react";
import Home from "./components/Home";
import Questions from "./components/Questions";
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  console.log(questions);

  // handling check answer button click
  function handleMainClick() {
    let errorMessage = "";
    if (questions.every((obj) => obj.answered)) {
      setAllQuestionAnswered(true);
      setScore(questions.filter((question) => question.isAnswerCorrect).length);
      errorMessage = "moze";
    } else {
      errorMessage = "e pa nece moci";
    }
    console.log(errorMessage);
  }

  const renderQuestionComponents =
    questions &&
    questions.map((question) => (
      <Questions
        question={question}
        setQuestions={setQuestions}
        key={question.id}
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
            <p className="result">You scored {score}/5 correct answers</p>
          )}
          <button onClick={handleMainClick} className="check-answers-btn">
            {allQuestionAnswered ? "Play again" : "Check answers"}
          </button>
        </div>
      </main>
    );
  }

  // return (
  //   <main className="container">
  //         {!startQuiz ? <Home
  //             questions={questions}
  //             setQuestions={setQuestions}
  //             setStartQuiz={setStartQuiz}
  //           />
  //         :

  //           {renderQuestionComponents}
  //           <div>
  //             <button onClick={handleMainClick} className="check-answers-btn">
  //               {allQuestionAnswered ? "Play again" : "Check answers"}
  //             </button>
  //           </div>
  //         }

  //   </main>
  // );
}

export default App;
