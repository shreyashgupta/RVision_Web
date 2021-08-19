import React from 'react';
import 'tachyons';
import { firestore } from '../../backend/server';
import './style.css'
import {Link, Redirect} from 'react-router-dom';
class SubjectiveEvaluation extends React.Component {
    constructor(props) {
        super(props)
        this.getAnswers=this.getAnswers.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this)
        this.state = {
            qa:[],
            isFaculty:false,
            fid:"",
            scores:[]
        }
        const token=localStorage.getItem('token');
        if(token=="faculty")
        {
          this.state.isFaculty=true;
          this.state.fid=localStorage.getItem('id');
        }
    }
    onChange = (event) => {    
        let val=event.target.name;
        let temp=this.state.scores;
        temp[event.target.name]=parseInt(event.target.value);
        this.setState({ scores:temp});
    }
    updateScore=async (event)=>
    {
        let i=event.target.name;
        let aid=this.state.qa[i].AnswerID;
        let score=this.state.scores[i];
        if(score>this.state.qa[i].score || score<0)
        {
            alert("Invalid range for score");
            return;
        }
        let score_prev=this.state.qa[i].studentScore;
        let diff;
        if(score_prev==-1)
            diff=score;
        else
            diff=score-score_prev;
        console.log(diff);
        let d={
        method:"POST",
        body: JSON.stringify(
          {
              AnswerID:aid,
              Score:diff
          }),
        headers:{
          'Content-Type':'application/json'
        }
            }
        await fetch("http://localhost:3000/faculty/subjectiveEval",d)
        .then(res=>res.json())
        .then(data=>{
            if(data!='success')
                alert("error in updating");
        })
        const ansRef = firestore.collection('answer').doc(aid);

        // Set the 'capital' field of the ans
        const res = await ansRef.update({studentScore:score});
        if(window.location.port){
            window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty/subjectiveEvaluation`);
        }
        else{
            window.location.assign(`http://${window.location.hostname}/faculty/subjectiveEvaluation`);
        }
        alert("updation successfull");

    }
    getAnswers = async(event) => {
        const { fid} = this.state;
        console.log(this.state)
        let ans=[];
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
          await fetch("http://localhost:3000/faculty/subEvaluate",d)
          .then(res=>res.json())
          .then(data=>{
            if(data=='error')
              {
                alert("NO QUESTIONS TO EVALUATE");
              }
              else
                ans=data;
            });
            let qaBlock=[];
            for(let i=0;i<ans.length;i++)
            {
                let aid=ans[i].AnswerID;
                let qid=ans[i].QID;
                await firestore.collection("answer").doc(aid)
                .get()
                .then(function(doc) {
                if (doc.exists) {
                    qaBlock[i]=doc.data();
                    qaBlock[i].AnswerID=aid;
                    qaBlock[i].QID=qid;
                } else {
                    console.log("No such document!");
                }
                }).catch(function(error) {
                console.log("Error getting document:", error);
                }); 
                await firestore.collection("question").doc(qid)
                .get()
                .then(function(doc) {
                if (doc.exists) {
                    // qaBlock[i]=doc.data();
                    // qaBlock[i].AnswerID=aid;
                    Object.assign(qaBlock[i], qaBlock[i], doc.data());
                } else {
                    console.log("No such document!");
                }
                }).catch(function(error) {
                console.log("Error getting document:", error);
                }); 
            }
            this.setState({qa:qaBlock});
            for(let i=0;i<qaBlock.length;i++)
            {
                this.state.scores[i]=qaBlock[i].studentScore;
            }
            console.log(this.state);
    }

    componentWillMount()
    {
        this.getAnswers();
    }
    render() {
        return (
        this.state.isFaculty?
            <div className="tc center">
                <legend className="f1 fw6 ph0 mh0 center">Subjective Evaluation</legend>
                <div>
                {
                    this.state.qa.length?
                    <div className='qas'>
                    {
                        this.state.qa.map((x,i)=>
                        {
                            return  <div className="ma5 qablock shadow-5 pa3 br3">
                                        <p>QUESTION : {x.questionBody}</p>
                                        <p>ANSWER : {x.answerText}</p>
                                        {
                                            x.modelAnswerAvailable?
                                            <p>MODEL ANSWER : {x.modelAnswer}</p>:<div/>
                                        }
                                        <div className='imgList'>
                                        {
                                            x.answerImages.map((img)=>
                                            {
                                                return <a href={img} target="_blank"><img alt="PDF" src={img}></img></a>
                                            })
                                        }
                                        </div>
                                        <p>MAX SCORE: {x.score}</p>
                                        <div className='updateScore'>
                                            <label className="db fw6 lh-copy f4">Score ({x.studentScore})</label>
                                            <input
                                                name={i}
                                                type="number"
                                                className="pa1 duration"
                                                value={this.state.scores[i]}
                                                onChange={this.onChange}
                                            />
                                            <input
                                                onClick={this.updateScore}
                                                className="b ph3 pv2 input-reset ba white br-pill bg-dark-green grow pointer f6 dib submit"
                                                type="submit"
                                                value="Update Score"
                                                name={i}
                                            />
                                        </div>
                                    </div>
                        })
                    }
                    </div>:
                    <div class="loader">Loading...</div>
                }
                </div>
                <Link to="/faculty"><input
                    className="b ph3 pv2 input-reset ba white bg-dark-blue grow pointer f6 dib ma2 br3"
                    type="submit"
                    value="Back"
                    /></Link>
            </div>:
        <div>
            <legend className="f1 fw6 ph0 mh0">Sign in as faculty required</legend>
        </div>
        );
    }
}

export default SubjectiveEvaluation;