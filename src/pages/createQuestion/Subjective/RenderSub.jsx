import React , {useState, useEffect} from "react";
import Select from 'react-select';
import { firestore } from '../../../backend/server';
import Question from "../Question";


export default function RenderSub ()
{
    let getCategories=async(cid)=>
    {
        let categories;
        //while(!mcqDoc.course.length);
        if(cid.length)
        {
            await firestore.collection("course").doc(cid)
              .get()
              .then(function(doc) {
                if (doc.exists) {
                    let x=doc.data().categories;
                    let categories=[];
                    for(let i=0;i<x.length;i++)
                    {
                        categories.push(
                        {
                            label:x[i],
                            value:i+1
                        })
                    }
                    setCategories(categories);
                } else {
                    setCategories({});
                  console.log("No such document!");
                }
              }).catch(function(error) {
                setCategories({});
                console.log("Error getting document:", error);
              }); 
      }
    }
    let getCourses=async()=>
    {
        let x=[];
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
            {
                x=data;
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

            }
          });
    }
  
    const [courses,setCourses]=useState({});
    const [categories,setCategories]=useState({});
    const [subDoc, setsubDoc] = useState(
        {
            //some form of NOSQL reference number
            questionType : "Sub",
            //this must not be zero, check - also store in SQL
            course: "",
            score : 0,
            category: "", 
            fid:localStorage.getItem('id'),
            questionBody : "",
            //because this is a subjective question
            modelAnswerAvailable : false,
            modelAnswer : ""
        }
    );
    useEffect(() => {
        getCourses();
    }, [])

    //Form submission function
    function generateID() {
        var length = 10,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    let noSQL=async (id)=>
    {
        const quesRef = firestore.doc(`question/`+id);
        try {
              await quesRef.set(subDoc);
              alert("Created Question");
          } catch (error) {
              console.log(error);
              alert(error.message);

          }
    }
    let sql=async(id)=>
    {
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            FID:subDoc.fid,
            QID:id,
            Score: subDoc.score,
            Category: subDoc.category,
            CourseId: subDoc.course,
            Qtype: subDoc.questionType
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/faculty/createQuestion",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='success')
              {
                alert("Creation Successful");
              }
              else
                alert("failed");
          });
    }
    async function submitQuestion()
    {
        if(subDoc.questionBody.length==0 || subDoc.score==0 ||subDoc.category.length==0||subDoc.course.length==0)
        {
            alert("Empty Fields");
            return -1;
        }
        //make a transaction to both SQL and NOSQL databases
        let id=generateID();

        //ensure that the form criteria is met 
        await noSQL(id);
        await sql(id);
        if(window.location.port){
            window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty`);
        }
        else{
            window.location.assign(`http://${window.location.hostname}/faculty`);
        }
    }


    //to set the question text
    function setQuestionBody(questionText)
    {
        setsubDoc((prevDoc) => {
            return {
                ...prevDoc,
                questionBody : questionText
            };
        });
    }

    //to select the course
    function updateCourse (event)
    {
        let c = event.target.value;
        setsubDoc((prevDoc)=>{return {
            ...prevDoc,
            course: c
        }});
    }

    //to update the question category
    function updateCategory(event)
    {
        let c = event.target.value;
        setsubDoc((prevDoc)=>{return {
            ...prevDoc,
            category: c
        }});
    }


    //to update the Score of the question
    function updateScore(event)
    {
        let c = event.target.value;
        setsubDoc((prevDoc)=>{return {
            ...prevDoc,
            score: c
        }});
    }

    function toggleModelAnswer(event)
    {
        setsubDoc((prevDoc)=>{
            return {
                ...prevDoc,
                modelAnswerAvailable : !(prevDoc.modelAnswerAvailable)
            }
        });
    }

    function updateModelAnswer (event)
    {
        const currentvalue = event.target.value;
        setsubDoc((prevDoc)=>{
            return {
                ...prevDoc,
                modelAnswer : currentvalue
            }
        });
    }
    async function courseChange(event)
    {
        await setsubDoc((prevDoc)=>{return {
            ...prevDoc,
            course: event.label
        }})
        //console.log(subDoc);
        await getCategories(event.label);
    }
    async function categoryChange(event)
    {
        await setsubDoc((prevDoc)=>{return {
            ...prevDoc,
            category: event.label
        }})
    }

    return (

        <div className="center">

            <Question setQuestion = {setQuestionBody}/>
            <div className="catcor">
                  <div className="mv3">
                      <label className="db fw6 lh-copy f4">Course</label>
                      <Select
                          name="form-field-name"
                          className="x center"
                          options={courses}
                          defaultValue={courses[1]}
                          onChange={courseChange}
                      />
                  </div>
                  <div className="mv3">
                      <label className="db fw6 lh-copy f4">Category</label>
                      <Select
                          name="form-field-name"
                          className="x center"
                          defaultValue={categories[1]}
                          options={categories}
                          onChange={categoryChange}
                      />
                  </div>
            </div>
            <div className="ma3">
                <label className="f4 fw6 ph0 tc ma2">Score</label>
                <input type="number" id="score" name="score" min="0" value = {subDoc.score}
                        onChange = {updateScore}
                />
            </div>
            {/* add model answer option and textbox here */}
            <div>
            <label className="f4 fw6 ph0 tc ma2">Provide Model Answer</label>
            <input type="checkbox" checked={subDoc.modelAnswerAvailable} onChange={toggleModelAnswer}/>
            </div>
            <div className="mt3">
            {subDoc.modelAnswerAvailable && (
                <textarea 
                    name="modelAnswer"
                    onChange={updateModelAnswer}
                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-50 modelans"
                    value={subDoc.modelAnswer}
                    placeholder="Enter Model Answer"
                    rows={1}
                    required //this might give a propblem, verify 
                />
            )}
            </div>
            <input type="submit" 
                className="br2 f4 input-reset ba bg-transparent  grow pointer hover-bg-purple hover-white pa2 w-15 mt3"
                value="Submit" 
                onClick={submitQuestion}
            />
        </div>
        
    );

    
}