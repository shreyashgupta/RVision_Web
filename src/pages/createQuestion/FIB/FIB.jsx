import React, { useState } from "react";
import AddAnswer from "./AddAnswer";
import AcceptedAnswer from "./AcceptedAnswer";

function FIB() {
  const [answers, setAnswers] = useState([]);

  function addAnswer(newAnswer) {
    setAnswers(prevAnswers => {
      return [...prevAnswers, newAnswer];
    });
  }

  function deleteAnswer(id) {
    setAnswers(prevAnswers => {
      return prevAnswers.filter((AnswerItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <AddAnswer onAdd={addAnswer} />
      {answers.map((AnswerItem, index) => {
        return (
          <AcceptedAnswer
            key={index}
            id ={index}
            content={AnswerItem}
            onDelete={deleteAnswer}
          />
        );
      })}
    </div>
  );
}

export default FIB;

//https://codesandbox.io/s/keeper-part-3-starting-pogqj?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/App.jsx