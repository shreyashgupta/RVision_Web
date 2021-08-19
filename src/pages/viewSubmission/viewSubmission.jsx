import React, { useState, useRef ,useEffect} from "react";
import DisplayQA from "./ViewScore/DisplayQA";
import './style.css';
import 'tachyons'
import {Link, Redirect} from 'react-router-dom';
export default function ViewSubmission(props) {

    //props has testID
    //using that, make a query to fetch the following details 
    const [qa, setqa] = useState ([]);
    useEffect(() => {
        getqa();
    }, [])

    let getqa=async()=>
    {
        let sid=localStorage.getItem('SID');
        console.log(sid);
        let ret;
        let d={
            method:"POST",
            body: JSON.stringify({
                sid:sid
            }),
          headers:{
            'Content-Type':'application/json'
          }
        }
        await fetch("http://localhost:3000/student/getSubmission",d)
        .then(res=>res.json())
        .then(data=>{
          if(data=='error')
            {
              alert("No Test Available");
            }
            else
            {
                ret=data;
            }
          });
        setqa(ret)
    }
    const qaPair = [];//this will contain {questionID, answerID}
    const testDetails =  {};//will contain test details as fetched from the sql databse
    //stuff like student score, max score (obtained by test type), duration , date
    //either obtained from sql here or passed in as props 


    //call function here to populate questionId answerID pair array 

    const averageScore = 0;
    const maxStudentScore = 0;

    //make a query and obtain these details - this will be the "report"

    return (
        <div  className='viewSubm shadow-5 ma4 tc center'>
            <label className="f1 fw6 ph0 mh0 tc">View Submission</label>
            {/* Go through all the questions and render them */}
            {
                qa.map((qa, index) => {
                    return <div>
                    <DisplayQA 
                        key={index}
                        questionNumber = {index}
                        QID = {qa.QID}
                        AnswerID = {qa.AnswerID}
                    />
                    </div>

                })
            }
            <Link to="/student/studentReport"><input
                className="b br3 ph3 pv2 input-reset ba b--black white bg-dark-blue grow pointer f6 dib ma3"
                type="submit"
                value="Back"
                /></Link>
        </div>
    );
}