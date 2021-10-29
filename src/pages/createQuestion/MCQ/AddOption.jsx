import React, { useState } from "react";
import './addOption.css';
function AddOption (props) {
  const [optionContent, setOption] = useState("");

  function handleChange(event) {
    const option = event.target.value;
    setOption(option);
  }

  function submitOption(event) {
    if(optionContent.length)
    {
      props.onAdd(optionContent);
      setOption("");
      event.preventDefault();
    }
  }

  return (
    <div className="addop center">
        <textarea
          name="optionForm"
          onChange={handleChange}
          value={optionContent}
          className="pa2 input-reset ba bg-transparent hover-black hover-bg-light-gray b w-30"
          placeholder="Add an option"
          required
          rows="1"
        />
        <input 
        type="submit" 
        value='+' 
        className="input-reset ba bg-transparent hover-white hover-bg-black b"
        onClick={submitOption}/>
    </div>
  );
}

export default AddOption;