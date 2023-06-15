import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = (questionId) => {
    console.log("Deleting question:", questionId);
    fetch(`http://localhost:4000/questions/${questionId}`, {
        method: 'DELETE',
    })
    .then(() => {
        setQuestions((prevQuestions) => {
            const newQuestions = prevQuestions.filter(
                (question) => question.id !== questionId
            );
            console.log("New questions:", newQuestions);
            return newQuestions;
        });
    })
    .catch((error) => console.error("Failed to delete question:", error));
};


  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setPage("List"); // Switch to the question list page after adding a question
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;

