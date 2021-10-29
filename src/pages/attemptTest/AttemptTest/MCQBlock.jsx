/* jshint esversion: 6 */

import React, {useState, useEffect} from "react";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";

export default function MCQBlock (props)
{

    const [studentAnswer, setStudentAnswer] = useState(
        {
            USN : "",
            studentScore : -1,
            AnswerType : "MCQ",
            chosenOption: -1
            //this will be the option selected by the student
        }
    );

    //this is to set an empty thing initially 
    useEffect(()=>{
        props.updateFunction (studentAnswer, props.questionNumber);
    }, []);


    function changeChoice(option, questionNumber)
    {
        setStudentAnswer((prevAnswer) => {
            return {
                ...prevAnswer,
                chosenOption: option.[questionNumber]
            }
        });
        props.updateFunction ({...studentAnswer, chosenOption: option.[questionNumber]}, questionNumber);
        //console.log(studentAnswer);
        //call some sort of an add answer function ?
    }
    return (
        <Test onOptionSelect={selectedOption => changeChoice(selectedOption, props.questionNumber)}>
            <h4>Q{props.questionNumber+1}</h4>
          <QuestionGroup questionNumber={props.questionNumber}>
            <Question>{props.questionBody}</Question>
            <div>Additional information</div>
            {props.choices.map((choice, index) => {
                return (
                <Option value={index}>{choice}</Option>);
            })}
          </QuestionGroup>
        </Test>
        
    );
}