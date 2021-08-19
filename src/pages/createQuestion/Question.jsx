
//this component is commmon to all the different types of questions
//this is just the description of a question

import React, { useState } from "react";
import './body.css'
function Question(props) {
  const [content, setContent] = useState("");

  function handleChange(event) {
    let c = event.target.value;
    setContent(c);
    props.setQuestion(c);
  }
  return (
    <div className="qbody center tc">
    <label className="f3 fw6 ph0 tc center pa3">Enter Question</label>
        <textarea
          name="content"
          onChange={handleChange}
          className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-30"
          value={content}
          placeholder="Enter a question"
          required
          rows="1"
        />
    </div>
  );
}

export default Question;