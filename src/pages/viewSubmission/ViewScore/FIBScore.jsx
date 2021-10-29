import React from "react";
import '../style.css';

export default function FIBScore (props)
{

    //everything required is passed in as props
    //just have to render the things 

    /*props will recieve -
    questionBody,
    array of accepted answers (acceptedAnswers)
    student asnwer (studentAnswer)
    max score for the question (maxScore)
    obtained score (studentScore)
    */ 

    return (

        <div className='question'>
            <p className='f4'>{props.question.questionBody}</p>
            <p className='f4'>Your Answer: <b>{props.answer.answerContent}</b></p>    
            <div>
            <p className='f4'>Accepted Answers :
            {
                props.question.acceptedAnswers.map((answer, index)=> {
                    return (
                        <label className="f4 fw6 ph0 mh0 tc ma2">
                            {answer}, 
                        </label>
                )
                })
            }
            </p>
            </div>
        </div>
    );
}