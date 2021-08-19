import React , {useState, useEffect} from "react";
import { firestore } from '../../../backend/server';
import Select from 'react-select';
import 'tachyons';

export default function Section(props)
{
    const [sectionDoc, setSectionDoc] = useState(
        {
            type: "MCQ",
            category: "",
            noOfQuestions: 0,
            questionScore: 0
        }
    );
    async function getQuestionCount()
    {
        let n;
        let qtype=sectionDoc.type;
        let course=props.course;
        let category=sectionDoc.category;
        let score=sectionDoc.questionScore;
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            CourseId:course,
            Qtype:qtype,
            Category:category,
            Score:score
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/faculty/getQuestionCount",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
              {
                alert("Error");
              }
              else
            {
                n=data;
            }
          });
        console.log(n);
        return n;
    } 
    function updateType(event)
    {
        let t = event.target.value;
        setSectionDoc((prevDoc)=>{
            return {
                ...prevDoc,
                type : t
            }
        }
        );
    }

    function updateCategory(event)
    {
        let t = event.target.value;
        setSectionDoc((prevDoc)=>{
            return {
                ...prevDoc,
                category : t
            }
        }
        );
    }

    function updateNoOfQuestions (event)
    {
        let t = event.target.value;
        setSectionDoc((prevDoc)=>{
            return {
                ...prevDoc,
                noOfQuestions: t
            }
        });
    }

    function updateQuestionScore (event)
    {
        let t = event.target.value;
        setSectionDoc((prevDoc)=>{
            return {
                ...prevDoc,
                questionScore: t
            }
        });
    }

    async function addSection(event) {
        let d = sectionDoc;
        if(d.noOfQuestions<=0 || d.category=="" || d.questionScore<=0)
        {
            alert("Invalid entry")
            return;
        }

        let n=await getQuestionCount();
        n=n.n;
        console.log(d)
        if(n>=d.noOfQuestions)
        {
            props.onAdd(d);
            setSectionDoc({
                type: "MCQ",
                category: " ",
                noOfQuestions: 0,
                questionScore: 0
            });
        }
        else
            alert("Only "+n+" questions available");
        //do this to reset the things
        event.preventDefault();
      }
    async function categoryChange(event)
    {
        await setSectionDoc((prevDoc)=>{return {
            ...prevDoc,
            category: event.label
        }})
    }

    return (
        <div>

            <div className="tc ma3 catscore">
                <div>
                    <label className="db fw6 lh-copy f4 ma1">Question Type</label>
                    <select className='pa1'name="type" id="type" value={sectionDoc.type} onChange={updateType}>
                        <option value="MCQ">Multiple Choice Question</option>
                        <option value="FIB">Fill in the Blank</option>
                        <option value="Sub">Subjective Question</option>
                    </select>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f4 ma1">Category</label>
                  <Select
                      name="form-field-name"
                      className="x center"
                      options={props.categories}
                      onChange={categoryChange}
                  />
                </div>
                <div>
                    <label className="db fw6 lh-copy f4 ma1">Score/ques</label>
                    <input type="number" 
                        min="0" 
                        className="pa2 input-reset ba bg-transparent black bg-light-gray b ady"
                        value={sectionDoc.questionScore} 
                        onChange={updateQuestionScore} />
                </div>
            </div>
            <div>
                 <label className="db fw6 lh-copy f4 ma1">Number</label>
                <input 
                    type="number" 
                    min="0" 
                    className="pa2 input-reset ba bg-transparent black bg-light-gray b ady ma2"
                    value={sectionDoc.noOfQuestions} 
                    onChange={updateNoOfQuestions} />
            </div>
            <input type="submit"
             onClick={addSection}
             value="Add section"
             className="b pa2 input-reset bg-transparent grow pointer f5 dib"
             />
        </div>
        
    );
}