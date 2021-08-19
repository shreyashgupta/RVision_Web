import React, {useState, useEffect} from "react";

import 'tachyons';
export default function FIBBlock (props)
{


    const [studentAnswer, setStudentAnswer] = useState(
        {
            USN : "",
            studentScore : -1,
            AnswerType : "FIB",
            answerContent : ""
            //this will be the option selected by the student
        }
    );

    //this is to set an empty thing initially 
    useEffect(()=>{
        props.updateFunction (studentAnswer, props.questionNumber);
    }, []);

    function changeAnswer(event)
    {
        let a = event.target.value;
        setStudentAnswer((prevAnswer) => {
            return {
                ...prevAnswer,
                answerContent: a
            }
        });
        props.updateFunction ({...studentAnswer, answerContent: a}, props.questionNumber);
        //call some sort of an add answer function ?
    }
    return (
        //this must return a block where the question is displayed and the student can answer
        //the question
        //assuming that props.question is a fill in the blank question that needs to be rendered

        //props.questionNumber is associated with that question

        <div className='qa center tc'>
            <h4>Q{props.questionNumber+1}</h4>
            <label className="db lh-copy f3">{props.questionBody}</label>
            <p>Max score: {props.score}</p><br></br>
            <div className="mt3">
                <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white x"
                    type="text" 
                    name="fibAnswer" 
                    value={studentAnswer.answerContent} 
                    onChange={changeAnswer}
                />
            </div>
        </div>
    );
}
