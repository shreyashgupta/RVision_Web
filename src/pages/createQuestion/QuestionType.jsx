import React from "react";
import './qtype.css'
/*can create these options as a separate component later*/
import 'tachyons';
//this is the part that I have to change to hold the question state

export default function QuestionType(props) {
  const [questionType, setQuestionType] = React.useState("MCQ");

  function updateChoice(event) {
    const qType = event.target.value;
    setQuestionType(qType);
    props.changeQuestionType (qType);
  }

  return (
    <div className="note">
    <div>
      <input
        type="radio"
        value="MCQ"
        onChange={updateChoice}
        checked={questionType === "MCQ"}
      />
      <b className='f5 fw6 tc'>MCQ</b>
      </div>
      <div>
      <input
        type="radio"
        value="FIB"
        onChange={updateChoice}
        checked={questionType === "FIB"}
      />
      <b className='f5 fw6 tc'>Fill in the Blanks</b>
      </div>
      <div>
      <input
        type="radio"
        value="Sub"
        onChange={updateChoice}
        checked={questionType === "Sub"}
      />
      <b className='f5 fw6 tc'>Subjective</b>
      </div>
    </div>
  );
} 