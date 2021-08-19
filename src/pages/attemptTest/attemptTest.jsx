import React, { useState, useEffect } from "react";
import MCQBlock from "./AttemptTest/MCQBlock";
import SubjectiveBlock from "./AttemptTest/SubjectiveBlock";
import FIBBlock from "./AttemptTest/FIBBlock";
import { firestore } from '../../backend/server';
import CountdownTimer from "react-component-countdown-timer";
import './style.css';
import 'tachyons';
/*
    Given a document containing question ID's - 
    dynamically generated using the constraints of the test
    0. Assign a testID for the test instance of the particular type
    1. Fetch the question document
    2. Render the question as well as an answering space for the question
    3. Add all the answers to the database upon submission - generate answerID
    4. Ensure that the test is mapped to the questionID and the answerID
*/
export default function AttemptTest(props) {
    function generateID() {
        var length = 10,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    const [submission, setSubmission] = useState (
    {
        submissionID: generateID(),
        USN: localStorage.getItem('id'),
        questions: [],//this is to be populated dynamically
        answers: [],
        testID:localStorage.getItem('tid'),
    }
    );
    const [time,setTime]=useState();
    const [test,setTest]=useState({});
    useEffect(() => {
        getTest();
    }, [])

    function testOver()
    {   //console.log(time);
        alert("TIME UP, Test Submitted");
        callChildFunction();
    }
    function onAnswerUpdate (answer, index)
    {
        let newAnswers = submission.answers;
        newAnswers[index] = answer;
        setSubmission((prevDoc) => {
            return {
                ...prevDoc, 
                answers: newAnswers
            }
        });
    }
    async function getQuestions(sections)
    {
        
        let arr=[];
        let qids=[];
        let ques=[];
        for(let i=0;i<sections.length;i++)
        {
            let category=sections[i].category;
            let n=sections[i].noOfQuestions;
            let score=sections[i].questionScore;
            let type=sections[i].type
            let d={
                    method:"POST",
                    body: JSON.stringify(
                    {
                        Category: category,
                        n:n,
                        Score:score,
                        type:type
                    }),
                    headers:{
                    'Content-Type':'application/json'
                    }
                  }
                 await fetch("http://localhost:3000/student/getQuestions",d)
                    .then(res=>res.json())
                    .then(data=>{
                    if(data==='error')
                    {
                        alert("Error");
                    }
                    else
                    {
                        ques=data;
                    }
                  });
            for(let j=0;j<ques.length;j++)
            {
                qids.push(ques[j].QID);
                await firestore.collection("question").doc(ques[j].QID)
                  .get()
                  .then(function(doc) {
                    if (doc.exists) {
                        arr.push(doc.data());
                    } else {
                      console.log("No such document!");
                    }
                  }).catch(function(error) {
                    console.log("Error getting document:", error);
                  }); 
            }        
        }
            await setSubmission((prevDoc) => {
                return {
                    ...prevDoc, 
                    qids:qids
                    }
            });
        return arr;
    }
    let noSQL=async (answer,id)=>
    {
        const ansRef = firestore.doc(`answer/`+id);
        try {
              await ansRef.set(answer);
              console.log("uploaded ans"+id)
            } catch (error) {
              console.log(error);
              alert(error.message);

          }
    }
    async function setAnswer(ans,id)
    {
       await noSQL(ans,id);
       // console.log(ans)
    }
    async function doSubmission(ansIDs)
    {
        let qtypes=[];
        for(let i=0;i<submission.questions.length;i++)
        {
            qtypes.push(submission.questions[i].questionType);
        }
        //console.log(qtypes);
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            SubmissionID:submission.submissionID,
            USN:submission.USN,
            AnsIds:ansIDs,
            QIDs:submission.qids,
            TestID:submission.testID,
            Qtypes:qtypes,
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/student/submission",d)
            .then(res=>res.json())
            .then(data=>{
            if(data==='success')
              {
                alert("Creation Successful");
              }
              else
                alert("failed");
          });
    if(window.location.port){
        window.location.assign(`http://${window.location.hostname}:${window.location.port}/student/`);
    }
    else{
        window.location.assign(`http://${window.location.hostname}/student`);
    }
    }
    async function callChildFunction ()
    {
        console.log(submission);
        let ansIDs=[];
        for(let i=0;i<submission.answers.length;i++)
        {
            let ans=submission.answers[i];
            let id=generateID();
            ansIDs.push(id);
            ans.USN=submission.USN;
            await setAnswer(ans,id);
        }
        doSubmission(ansIDs);
    }
    async function getTest()
    {
        console.log("herer");
        let id=localStorage.getItem('tid');
        if(id==null)
            return;
        let temp;
        await firestore.collection("test").doc(id)
          .get()
          .then(function(doc) {
            if (doc.exists) {
                temp=doc.data();
            } else {
              console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          }); 
          await setTest(temp);
          
          let allQues=await getQuestions(temp.sections);
          //console.log(allQues);
          setSubmission((prevDoc) => {
            return {
                ...prevDoc, 
                questions:allQues,
                answers:Array(allQues.length).fill({})
                }
            });
        let x=new Date(temp.date+'T' + temp.startTime);
        let y=new Date();
        await setTime((y-x)/1000);
        console.log((y-x)/1000);
        // console.log(test.duration*60+ (new Date(test.date+'T' + test.startTime)-new Date())/1000);
          // console.log(dummyTest);
    }

    return (
        submission.questions.length?
        <div>
        <div className="attemptTest tc center">
            <legend className="f1 fw6 ph0 mh0 center ma3 center">Attempting Test</legend>

            {
                submission.questions.map((question, index) => {
                    return <div className='pa3 attemptqa ma2'>
                    {
                        question.questionType === "MCQ" &&
                        <MCQBlock
                            updateFunction = {onAnswerUpdate}
                            questionNumber={index}
                            key={index}
                            score = {question.score}
                            questionBody={question.questionBody}
                            choices={question.choices}

                        />
                    }
                    {
                        (question.questionType === "FIB") &&
                        <FIBBlock
                            updateFunction = {onAnswerUpdate}
                            questionNumber={index}
                            key={index}
                            score = {question.score}
                            questionBody={question.questionBody}
                        />
                    }
                    {
                        question.questionType === "Sub" &&
                        <SubjectiveBlock
                            updateFunction = {onAnswerUpdate}
                            questionNumber={index}
                            key={index}
                            score = {question.score}
                            questionBody={question.questionBody}
                            submissionID={submission.submissionID}
                        />
                    }
                    </div>
                })
            }
            <input
              onClick={callChildFunction}
              className="b ph3 pv2 input-reset ba white bg-dark-green grow pointer f6 dib submit br-pill"
              type="submit"
              value="Submit Test"
            />
        </div>
        {
            time?
            <div className='timer br3 '>
                <CountdownTimer className="red pa2 br3"count={test.duration*60-time} onEnd={testOver} hideDay={true} border />
            </div>:<div/>
        }
            </div>:<div class="loader">Loading...</div>
    );
}