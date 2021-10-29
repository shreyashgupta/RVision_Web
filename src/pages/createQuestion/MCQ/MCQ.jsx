import React, { useState } from "react";
import AddOption from "./AddOption";
import MCQOption from "./MCQOption";

function MCQ() {
  const [options, setOptions] = useState([]);

  function addOption(newOption) {
    setOptions(prevOptions => {
      return [...prevOptions, newOption];
    });
  }

  function deleteOption(id) {
    setOptions(prevOptions => {
      return prevOptions.filter((optionItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <AddOption onAdd={addOption} />
      {options.map((optionItem, index) => {
        return (
          <MCQOption
            key={index}
            id={index}
            content={optionItem}
            onDelete={deleteOption}
          />
        );
      })}
    </div>
  );
}

export default MCQ;
