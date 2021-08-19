import React , {useState, useEffect} from "react";
import Question from "../Question";
import AddAnswer from "./AddAnswer";
import AcceptedAnswer from "./AcceptedAnswer";
import Select from 'react-select';
import { firestore } from '../../../backend/server';
export default function RenderFib ()
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
    const [fibDoc, setfibDoc] = useState(
        {
            //some form of NOSQL reference number
            questionType : "FIB",
            //this must not be zero, check - also store in SQL
            score : 0,
            category: "",
            course:'',
            questionBody : "",
            fid:localStorage.getItem('id'),
            //because this is a fill in the blanks question
            acceptedAnswers : [],
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
              await quesRef.set(fibDoc);
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
            FID:fibDoc.fid,
            QID:id,
            Score: fibDoc.score,
            Category: fibDoc.category,
            CourseId: fibDoc.course,
            Qtype: fibDoc.questionType
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
        if(fibDoc.questionBody.length==0 || fibDoc.score==0 ||fibDoc.category.length==0||fibDoc.course.length==0|| fibDoc.acceptedAnswers.length==0)
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
        setfibDoc((prevDoc) => {
            return {
                ...prevDoc,
                questionBody : questionText
            };
        });
    }

    //to update the question category
    function updateCategory(event)
    {
        let c = event.target.value;
        setfibDoc((prevDoc)=>{return {
            ...prevDoc,
            category: c
        }});
    }


    //to update the Score of the question
    function updateScore(event)
    {
        let c = event.target.value;
        setfibDoc((prevDoc)=>{return {
            ...prevDoc,
            score: c
        }});
    }

    //to add answer 
    function addAnswer(newAnswer)
    {
        setfibDoc((prevDoc) => {
            return {
                ...prevDoc,
                acceptedAnswers: [...prevDoc.acceptedAnswers, newAnswer]
            };
        });
    }

    //function to delete answer
    function deleteAnswer(id)
    {
        setfibDoc((prevDoc) => {
            return {
                ...prevDoc,
                acceptedAnswers: prevDoc.acceptedAnswers.filter((item, index) => (index !== id))
            }
          });
    }
    async function courseChange(event)
    {
        await setfibDoc((prevDoc)=>{return {
            ...prevDoc,
            course: event.label
        }})
        //console.log(fibDoc);
        await getCategories(event.label);
    }
    async function categoryChange(event)
    {
        await setfibDoc((prevDoc)=>{return {
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
                <input type="number" id="score" name="score" min="0" value = {fibDoc.score}
                        onChange = {updateScore}
                />
            </div>
            <AddAnswer onAdd={addAnswer} />
            <div className="ops">
            {fibDoc.acceptedAnswers.map((AnswerItem, index) => {
                return (
                <AcceptedAnswer
                    key={index}
                    id ={index}
                    content={AnswerItem}
                    onDelete={deleteAnswer}
                />
                );
            })}
            </div>
            <input type="submit" 
                className="br2 f4 input-reset ba  bg-transparent  grow pointer hover-bg-purple hover-white pa2 w-15 mt3 dib"
                value="Submit" 
                onClick={submitQuestion}
            />
        </div>
        
    );
}


