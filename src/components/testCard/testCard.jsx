import React, {useState} from "react";
import './style.css';
import 'tachyons';
export default function TestTile(props)
{
    //props.tistID also passed

    //always put these inside a section with className="cards"

    function renderTest (event)
    {
        //redirect to the test page using props.testID
        ;
    }
    return (
        <div className="card shadow-5 br4">
            <div className="courseInfo">
                <p className='name'>{props.name}</p>
                <p className='id'>{props.course}</p>
                {
                    props.avail?
                    <input
                    className="b ph3 pv2 input-reset ba white bg-purple grow pointer f6 dib ma2 btn br3"
                    type="submit"
                    onClick={props.takeTest}
                    value="Attempt"
                    name={props.index}
                    />:
                    <h2>Upcoming</h2>
                }
            </div>
            <div className='testInfo'>
                <p>Start Time : <b>{props.time}</b></p>
                <p>Duration : <b>{props.duration} min</b></p>
                <p>Date : <b>{props.date}</b></p>
                <p>Max Score : <b>{props.score}</b></p>
            </div>
        </div>
    );
}