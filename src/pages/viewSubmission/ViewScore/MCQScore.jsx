import React, { useState, useEffect } from "react";
import '../style.css'
import 'tachyons' 
export default function FIBBlock(props) {

    //everything required is passed in as props
    //just have to render the things 

    /*props will recieve -
    questionBody,
    array of choices (choices)
    student choice (studentChoice)
    correct choice (correctChoice)
    */

    return (

        <div className='mcq ma2 question'>
            <label className="f3 fw6 ph0 mh0 tc ">{props.question.questionBody}</label><br />
            <p className='f4'>Your Choice : <b>{props.answer.chosenOption}</b></p>
            <p className='f4'>Accepted option : <b>{props.question.correctChoice}</b></p>
            <div>
                {
                    props.question.choices.map((choice, index) => {
                        return (
                            <p className='f4'>{index} : {choice}</p>
                        )
                    })
                }
            </div>
        </div>
    );
}