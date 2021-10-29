import React, {useState, useEffect} from "react";
import {storage} from '../../../backend/server.js';

//change this subjective block 
import 'tachyons';
import '../style.css';

export default function SubjectiveBlock (props)
{
    const [file,setFile]=useState([]);
    const [studentAnswer, setStudentAnswer] = useState(
        {
            USN : "",
            studentScore : -1,
            AnswerType : "Sub",
            answerText : "",
            answerImages : []
        });
    let handleFileUpload = async (event) => {
        if (!file) {
            alert("Upload image and then click on upload button");
        } else {
            const uploadTask = storage.ref(`${props.submissionID}/${file.name}`).put(file);

            uploadTask.on('state_changed',
                (snapShot) => { },
                (error) => { console.log(error) },
                () => {
                    storage
                        .ref(`${props.submissionID}`)
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            let imgs=studentAnswer.answerImages;
                            imgs.push(url);
                            console.log(url);
                            setStudentAnswer((prevDoc) => {
                                return {
                                    ...prevDoc, 
                                    answerImages:imgs
                                }
                            });
                            alert("image uploaded");
                            console.log(studentAnswer);
                            //this.setState({image: url }, () => console.log(this.state));
                        })
                });
            setFile(null);
        }
    }
    useEffect(()=>{
        props.updateFunction (studentAnswer, props.questionNumber);
    }, []);
    let handleFileChange = (event) => {
        if (event.target.files[0]) {
                
            setFile(event.target.files[0])
        }
        console.log(studentAnswer);
    }
    function changeAnswerText(event)
    {
        let a = event.target.value;
        setStudentAnswer((prevAnswer) => {
            return {
                ...prevAnswer,
                answerText: a
            }
        });
        props.updateFunction ({...studentAnswer, answerText: a}, props.questionNumber);
        //call some sort of an add answer function ?
    }
    return (
        //this must return a block where the question is displayed and the student can answer
        //the question
        //assuming that props.question is a fill in the blank question that needs to be rendered

        //props.questionNumber is associated with that question

        <div className='center tc subQues'>
            <h3 className='purple'>Q{props.questionNumber+1}</h3>
            <label className="db lh-copy f3">{props.questionBody}</label>
            <p>Max score: {props.score}</p><br></br>
            <textarea 
                    type="text" 
                    name="subAnswer" 
                    value={studentAnswer.answerText} 
                    onChange={changeAnswerText}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50 answerBody"
                    placeholder="Enter Answer"
                    rows={1}
            />
            <div className="r tc center">
                <div className="mt3 file center br2 pa2">
                    <label className="db fw6 lh-copy f6 ">Upload Image</label>
                    <input 
                        type='file' 
                        className='ba pa2 ma2'
                        onChange={handleFileChange} 
                    />
                    <input 
                        type='button' 
                        value="Upload"
                        className="pa2 input-reset ba bg-purple white br3 grow pointer "
                        onClick={handleFileUpload}
                    />
                </div>
            </div>
            <div className='imgList'>
            {
                studentAnswer.answerImages.map((x,i)=>
                {
                    return <a href={x} target="_blank"><img className='ma2 ' src={x}></img></a>
                })   
            }
            </div>
        </div>
    );
}