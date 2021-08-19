import React from "react";


export default function Section(props)
{

    function handleClick(event) {
        console.log(props.id);
        props.onDelete(props.id, props.item.noOfQuestions, props.item.questionScore);

        event.preventDefault();

      }

    return (
        <div className="section">
          <p>Question type: {props.item.type}</p>
          <p>Category: {props.item.category}</p>
          <p>Number of questions: {props.item.noOfQuestions}</p>
          <p>Score for each question: {props.item.questionScore}</p>
          <button onClick={handleClick}>Delete Section</button>
        </div>
      );
}
