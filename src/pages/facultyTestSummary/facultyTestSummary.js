import React, {useState,useEffect} from "react";
import TestItem from "./TestItem/TestItem";
import Select from 'react-select';
import 'tachyons';
import {firestore} from '../../backend/server';
import './style.css'
import {Link,Router} from 'react-router-dom';
function FacultyTestSummary ()
{
    /*
    1. query for all the tests based on the query criteria
    2. dislpay the tests 
    3. display specific test details 
    4. allow specific usn score for the given test
    */

   let currentDate = new Date().toISOString().slice(0, 10);

    //query block and test summary block have their ' position: "fixed" '
    const [queryData, setQueryData] = useState ({
        semester: "",
        course: "",
        fromDate: currentDate,
        toDate: currentDate,
        });

    const [testList, setTestList] = useState ([]);
    const [courses, setCourses] = useState ([]);
    useEffect(() => {
        getCourses();
    }, [])
    let getCourses=async()=>
    {
        let x;
        let fid=localStorage.getItem('id');
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            FID:fid
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/faculty/getCourses",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
              {
                alert("Error");
              }
              else
                x=data;
          });
        //console.log(x);
        let courses=[];
        for(let i=0;i<x.length;i++)
        {
            courses.push(
            {
                label:x[i].CourseId,
                value:i+1
            })
        }
        setCourses(courses);
        console.log(courses);
    }
    const [test, setTest] = useState ({
        id: "",
        date: "",
        duration: "",
        score: "",
        maxScore: "",
        minScore: "",
        avgScore: "",
        attemptedBy: ""
    });

    const [usn, setUSN] = useState("");
    const [score, setScore]= useState (0);
    let getTests=async ()=>
    {
        let copy=queryData;
        let ret;
        let d={
            method:"POST",
            body: JSON.stringify(
                copy),
          headers:{
            'Content-Type':'application/json'
          }
        }
        await fetch("http://localhost:3000/faculty/fts/getTids",d)
        .then(res=>res.json())
        .then(data=>{
          if(data=='error')
            {
              alert("No Test Available");
            }
            else
            {
                ret=data;
                console.log(data);
            }
          });
          return ret;
    }
    async function makeQuery (event)
    {
        //console.log(queryData);
        let testids=await getTests()
        await setTestList(testids);
        console.log(testList);
    }
    let getTestInfo = async(tid) => {
        let data;
        await firestore.collection("test").doc(tid)
        .get()
        .then(function(doc) {
        if (doc.exists) {
            data=doc.data();
        } else {
            console.log("No such document!");
        }
        }).catch(function(error) {
        console.log("Error getting document:", error);
        }); 
        return data;
    }
    async function updateTest (props)
    {
        //this will 
        //props.id will have test id
        // console.log(props);
        let testInfo;//make query from test table 
        let summary;//make query from the submission table
        let d={
            method:"POST",
            body: JSON.stringify(
                {
                    TestID:props
                }
                ),
          headers:{
            'Content-Type':'application/json'
          }
        }
        await fetch("http://localhost:3000/faculty/fts/updateTest",d)
        .then(res=>res.json())
        .then(data=>{
          if(data=='error')
            {
              alert("Error");
            }
            else
            {
                summary=data;
                //console.log(data);
            }
          });
        testInfo=await getTestInfo(props);
        await setTest ({
            id: testInfo.testID,
            date: testInfo.date,
            duration: testInfo.duration,
            score: testInfo.maxScore,
            id:props,
            maxScore: summary[0].maxScore,
            minScore:  summary[0].minScore,
            avgScore: summary[0].avgScore,
            attemptedBy: summary[0].attemptedBy
        });
        console.log(test)
    }

    function updateSemester (event)
    {
        let t = event.target.value;
        setQueryData ((prevDoc)=>{
            return ({
                ...prevDoc,
                semester: t
            })

        })
    }
    let courseChange=async(event)=> {
        let t = event.label;
        setQueryData ((prevDoc)=>{
            return ({
                ...prevDoc,
                course: t
            })
        })
    }
    async function getUSNScore (event)
    {
        let d={
            method:"POST",
            body: JSON.stringify(
                {
                    TestID:test.id,
                    USN:usn
                }
                ),
          headers:{
            'Content-Type':'application/json'
          }
        }
        let score;
        await fetch("http://localhost:3000/faculty/fts/USNScore",d)
        .then(res=>res.json())
        .then(data=>{
          if(data=='error')
            {
              alert("Error");
            }
            else
            {
                score=data[0].Score;
                console.log(score);
                //console.log(data);
            }
          });
          setScore(score);
        //update the USN here
        //query for the score of the particulat USN

    }

    function updateUSN (event)
    {
        const t = event.target.value;
        //console.log(t);
        setUSN(t);
    }

    function updateFromDate (event)
    {
        let t = event.target.value;
        setQueryData((prevDoc)=>{
            return (
                {
                    ...prevDoc,
                    fromDate: t
                }
            )
        })
    }

    function updateToDate (event)
    {
        let t = event.target.value;
        setQueryData((prevDoc)=>{
            return (
                {
                    ...prevDoc,
                    toDate: t
                }
            )
        })
    }

    //have to change the styles
    if(localStorage.getItem('token')=="faculty")
    return (
        <div className='fts tc center'>
            <label className="f1 fw6 ph0 mh0 tc">Test Stats</label>
            <div className="queryBlock shadow-5 pa3 center tc ma4 br3">
                <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="email-address">Semester</label>
                    <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                        type="number"
                        name="semester"
                        onChange={updateSemester} 
                        value={queryData.semester}
                    />
                </div>
                <div className="mv3 ">
                    <label className="db fw6 lh-copy f4">Course</label>
                        <Select
                            name="form-field-name"
                            className="x center course"
                            options={courses}
                            onChange={courseChange}
                        />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f4">From : </label>
                    <input
                        className="pa2 input-reset black ba bg-white date"
                        type="date"
                        onChange={updateFromDate} 
                        max={queryData.toDate} 
                        value={queryData.fromDate}
                        />
                </div> 
                <div className="mv3">
                    <label className="db fw6 lh-copy f4">To</label>
                    <input
                        className="pa2 input-reset black ba bg-white date"
                        type="date"
                        onChange={updateToDate} 
                        min={queryData.fromDate} 
                        max={currentDate} 
                        value={queryData.toDate}
                        />
                </div>  
                <div className="mv3">
                    <input
                        onClick= {makeQuery}
                        className="b br2 ph3 ma2 pv2 input-reset ba white bg-purple grow pointer f6 dib"
                        type="submit"
                        value="Get Tests"
                    />
                </div>
            </div>
            <div className="testSummaryBlock center tc shadow-5 br3 pa3">
            {
                test.id != "" ? 
                    <div >
                        <div className="testInfo center">
                            <p>ID: <b>{test.id} </b></p>
                            <p>Date: <b>{test.date}</b></p>
                            <p>Duration: <b>{test.duration}</b></p>
                            <p>Score: <b>{test.score}</b></p>
                            <p>Attempted by: <b>{test.attemptedBy}</b></p>
                            <p>Average Score: <b>{test.avgScore}</b></p>
                            <p>Max Score: <b>{test.maxScore}</b></p>
                            <p>Min Score: <b>{test.minScore}</b></p>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4">USN</label>
                            <input
                                className="pa2 input-reset black ba bg-white date"
                                type="text" 
                                placeholder="Enter USN Here" 
                                value={usn} 
                                onChange={updateUSN}
                            />
                        </div>  
                        <input
                            onClick={getUSNScore}
                            className="b br-pill ph3 pv2 input-reset ba white bg-dark-green grow pointer f4 dib submit"
                            type="submit"
                            value="Fetch"
                        />
                        <p className="f3">Score: <b>{score}</b></p>
                    </div>
            : <div>Select a test to get the summary</div>
            }
            </div>
            <div className="testList">
            {
                testList?
                testList.map((x,i)=>
                {
                    return <TestItem data={x} key={i} updateTest={updateTest}/>
                }):<div/>
            }
            </div>
            <Link to="/faculty">
                    <input
                      className="b ma3 br-pill ph3 pv2 input-reset ba white bg-dark-blue grow pointer f6 dib"
                      type="submit"
                      value="Back"
                    />
                </Link>
        </div>
    );
    else
        return(
            <h1>Sign In as faculty required</h1>
        );
}

export default FacultyTestSummary;