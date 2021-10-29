import React , {useState, useEffect} from "react";
import Question from "../Question";
import MCQOption from "./MCQOption";
import { firestore } from '../../../backend/server';
import AddOption from "./AddOption";
import Select from 'react-select';
import './mcq.css';
export default function RenderMcq ()
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
    // let getCourseUtil=async()=>
    // {
    //     let courses= await getCourses();
    //     console.log(courses);
    //     return courses;
    // }
    const [courses,setCourses]=useState({});
    const [categories,setCategories]=useState({});
    const [mcqDoc, setmcqDoc] = useState(
        {
            //some form of NOSQL reference number
            questionType : "MCQ",
            //this must not be zero, check - also store in SQL
            score : 0,
            category : "",
            course: "",
            questionBody : "",
            //because this is a subjective question
            choices : [],
            correctChoice : -1,
            fid:localStorage.getItem('id')
        }
    );
    //Form submission function
    useEffect(() => {
        getCourses();
    }, [])
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
              await quesRef.set(mcqDoc);
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
            FID:mcqDoc.fid,
            QID:id,
            Score: mcqDoc.score,
            Category: mcqDoc.category,
            CourseId: mcqDoc.course,
            Qtype: mcqDoc.questionType
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
        if(mcqDoc.questionBody.length==0 || mcqDoc.score==0 ||mcqDoc.category.length==0||mcqDoc.course.length==0|| mcqDoc.choices.length==0)
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

    //this is to set the body of a question
    function setQuestionBody(questionText)
    {
        setmcqDoc((prevDoc) => {
            return {
                ...prevDoc,
                questionBody : questionText
            };
        });
    }

    //to add an option to the MCQ options list
    function addOption(newOption)
    {
        setmcqDoc((prevDoc) => {
            return {
                ...prevDoc,
                choices: [...prevDoc.choices, newOption]
            };
        });
    }

    //to remove an option from the list of choices
    function deleteOption(id)
    {
        setmcqDoc((prevDoc) => {
            return {
                ...prevDoc,
                choices: prevDoc.choices.filter((item, index) => (index !== id))
            }
          });
    }

    //to update the question category
    async function updateCategory(event)
    {
        let c = event.target.value;
        await setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            category: c
        }});
    }

    //to select the course
    function updateCourse (event)
    {
        let c = event.target.value;
        setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            course: c
        }});
    }


    //to update the Score of the question
    function updateScore(event)
    {
        let c = event.target.value;
        setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            score: c
        }});
    }

    //to update the Score of the question
    function updateCorrectChoice(event)
    {
        let c = event.target.value;
        setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            correctChoice: c
        }});
    }
    async function courseChange(event)
    {
        await setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            course: event.label
        }})
        //console.log(mcqDoc);
        await getCategories(event.label);
    }
    async function categoryChange(event)
    {
        await setmcqDoc((prevDoc)=>{return {
            ...prevDoc,
            category: event.label
        }})
    }
    return (
            <div>
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
                <input type="number" id="score" name="score" min="0" value = {mcqDoc.score}
                        onChange = {updateScore}
                />
            </div>
            <div className="mv4">
                <label className="f4 fw6 tc">Add Options</label>
                <AddOption onAdd={addOption} />
                <div className="ops">
                {mcqDoc.choices.map((optionItem, index) => {
                    return (
                        <MCQOption
                            key={index}
                            id={index}
                            content={optionItem}
                            onDelete={deleteOption}
                        />
                    );
                })}
                </div>
            </div>
            <div className="tc corr">
                <label className="f4 fw6 tc">Correct Option</label>
                <input type="number" 
                        id="correctChoice" 
                        name="correctChoice" 
                        min="0" 
                        className="input-reset ba bg-transparent black bg-light-gray b"
                        value = {mcqDoc.correctChoice}
                     onChange = {updateCorrectChoice}
                    />
            </div>

            <input type="submit" 
                className="br2 f4 input-reset ba bg-transparent hover-bg-purple  grow pointer hover-white pa2 w-15 mt3"
                value="Submit" 
                onClick={submitQuestion}
            />
            
        </div>  

        
    );

    
}