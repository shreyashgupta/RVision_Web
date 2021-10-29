import React, { useState } from "react";

function AddAnswer (props) {
  const [answer, setAnswer] = useState("");

  function handleChange(event) {
    const answer = event.target.value;
    setAnswer(answer);
  }

  function submitAnswer(event) {
    if(answer.length)
    {
      props.onAdd(answer);
      setAnswer("");
      event.preventDefault();
    }
    //to prevent the page from reloading
  }

  return (
    <div className="addop center">
        <textarea
          name="optionForm"
          onChange={handleChange}
          value={answer}
          className="pa2 input-reset ba bg-transparent hover-black hover-bg-light-gray b w-30"
          placeholder="Add an answer"
          required
          rows="1"
        />
        <input 
        type="submit" 
        value='+' 
        className="input-reset ba bg-transparent hover-white hover-bg-black b"
        onClick={submitAnswer}/>
    </div>
  );
}

export default AddAnswer;