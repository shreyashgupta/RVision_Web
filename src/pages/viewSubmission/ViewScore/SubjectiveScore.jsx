import React, {useState, useEffect} from "react";

import '../style.css'
//change this subjective block 

import 'tachyons';
export default function SubjectiveBlock (props)
{
    /* 
    Question body
    Student answer
    Images (if any) - once incorporated
    Model answer (to be displayed?)
    */

    return (

        <div>
            <div className='question ma2'>
            <label className="f3 fw6 ph0 mh0 tc ">{props.question.questionBody}</label><br />
            <p className='f4'>{props.answer.answerText}</p>
            <div className='imgList'>
                {props.answer.answerImages.map((image, index)=>{
                    return (

                        <a href={image} target="_blank"><img className='ma2' src={image}></img></a>
                    )
                })}
            </div>
            </div>
        </div>
    );
}