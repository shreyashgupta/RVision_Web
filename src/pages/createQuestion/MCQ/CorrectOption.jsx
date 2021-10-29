import React, { useState } from "react";

function CorrectOption(props) {
  const [optionIndex, setContent] = useState(-1);

  function handleChange(event) {
    let c = event.target.value;
    setContent(c);
    props.setCorrectOption(c);
  }
  return (
    <div>
      <form>
        <input 
            type="number" 
            name="correctOption"
            onChange={handleChange}
            value={optionIndex}
            placeholder="Enter correct option"
            required
        />
      </form>
    </div>
  );
}

export default Question;