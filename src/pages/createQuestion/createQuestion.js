import React, {useState} from "react";
import QuestionType from "./QuestionType";
import RenderMCQ from "./MCQ/RenderMcq";
import RenderSub from "./Subjective/RenderSub";
import RenderFIB from "./FIB/RenderFib";
import {Link, Redirect} from 'react-router-dom';
import 'tachyons';
import './style.css';
function CreateQuestion ()
{
    const [questionType, setQuestionType] = useState("MCQ");

    function setQType (questionType)
    {
        //refers to the type of question
        setQuestionType(questionType);
    }
    if(localStorage.getItem('token')=="faculty")
        return (
            <div className='cq tc center'>
                <label className="f1 fw6 ph0 tc ma4">Create Question</label>
                <div className="seltype br3 center shadow-5">
                    <label className="f3 fw6 ph0 tc ma4">Select Question Type</label><QuestionType changeQuestionType={setQType}/>
                </div>
                <div className="center tc shadow-5 br3 pa4">
                    {questionType === "MCQ" &&  <RenderMCQ />}
                    {questionType === "FIB" && <RenderFIB />}
                    {questionType === "Sub" && <RenderSub />}
                </div>
                <Link to="/faculty">
                    <input
                      className="ma4 ph3 pv2 input-reset ba white bg-dark-blue br3 grow pointer f5 dib x"
                      type="submit"
                      value="back"
                    />
                </Link>
            </div>
        );
    else
        return <h1>Not Logged in as faculty</h1>
}

export default CreateQuestion;