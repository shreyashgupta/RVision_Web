import React from "react";

function AcceptedAnswer(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="choice tc br3">
      <p>{props.content}</p>
      <input 
        type="submit" 
        value='delete' 
        className="input-reset ba bg-transparent black bg-light-gray b"
        onClick={handleClick}/>
    </div>
  );
}

export default AcceptedAnswer;