import FIBScore from "./FIBScore";
import React, {useState,useEffect} from "react";
import {firestore} from '../../../backend/server'
import MCQScore from "./MCQScore";
import SubjectiveScore from "./SubjectiveScore";

import '../style.css'
//this block displays a single question answer pair 


export default function DisplayQA (props)
{

    //assume that the props obtains questionID and answerID
    //using them, we fetch the corresponding documents from firebase
    //make query
    const [qa,setqa]=useState(
        {
            answer:{},
            question:{}
        }
    );
    useEffect(() => {
        getqa();
    }, [])

    let getqa=async()=>
    {
        let q,a;
        let qid=props.QID;
        let aid=props.AnswerID;
        console.log(qid,aid);
        await firestore.collection("question").doc(qid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
                q=doc.data();
            } else {
              console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          }); 
          await firestore.collection("answer").doc(aid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
                a=doc.data();
            } else {
              console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          }); 
          setqa ((prevDoc)=>{
            return({
                ...prevDoc,
                answer:a,
                question:q
            })
        })
    }
    /*
    max score for the question (maxScore)
    obtained score (studentScore)
    */
    
    return (
        <div className='ma3 pa3 qab'>
            <label className="f2 fw6 ph0 mh0 tc purple">{props.questionNumber + 1}</label><br />
            <label className="f4 fw6 ph0 mh0 tc">Max Score : {qa.question.score}</label><br /> 
            <label className="f4 fw6 ph0 mh0 tc">Your Score : {qa.answer.studentScore}</label><br />    
            {/* pass in the required parameters         */}
            {
                (qa.question.questionType === "MCQ") &&
                <MCQScore
                    question={qa.question}
                    answer={qa.answer}
                />
            }
            {
                (qa.question.questionType === "FIB") &&
                <FIBScore
                question={qa.question}
                answer={qa.answer}
                />
            }
            {
                (qa.question.questionType === "Sub") &&
                <SubjectiveScore
                question={qa.question}
                answer={qa.answer}
                />
            }
        </div>
    );
}