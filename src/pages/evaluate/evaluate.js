import React from 'react';
import 'tachyons';
import { firestore } from '../../backend/server';
import './style.css'
import {Link,Router} from 'react-router-dom';
class Evaluate extends React.Component {
    constructor(props) {
        super(props)
        this.getTests=this.getTests.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this)
        this.state = {
            isFaculty:false,
            fid:"",
            tests:[],
            tids:[]
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
    evaluate=async (event)=>
    {
        let i=event.target.name;
        let tid=this.state.tids[i].TestID;
        let d={
            method:"POST",
            body: JSON.stringify(
            {
                TestID:tid
            }),
          headers:{
            'Content-Type':'application/json'
          }
        }
        await fetch("http://localhost:3000/faculty/evaluate",d)
        .then(res=>res.json())
        .then(data=>{
            if(data=='error')
            {
              alert("NO QUESTIONS TO EVALUATE");
            }
            else
              {
                  alert("Evaulation success");
              }
          });

    }
    updateSubmissions=async (event)=>
    {
        let i=event.target.name;
        let tid=this.state.tids[i].TestID;
        let d={
            method:"POST",
            body: JSON.stringify(
            {
                TestID:tid
            }),
          headers:{
            'Content-Type':'application/json'
          }
        }
        await fetch("http://localhost:3000/faculty/updateSubmissions",d)
        .then(res=>res.json())
        .then(data=>{
          if(data=='error')
            {
              alert("NO SCORES TO UPDATE");
            }
            else
            {
                alert("UPDATED SCORES");
            }
          });
    }
    getTests = async() => {
        let tids=[]
        await fetch("http://localhost:3000/faculty/evaluate/getTests")
        .then(response => response.json())
        .then(data => {tids=data});
        return tids;
    }
    getTestInfo = async(tids) => {
        let data=[]
        for(let i=0;i<tids.length;i++)
        {
            let tid=tids[i].TestID;
            await firestore.collection("test").doc(tid)
            .get()
            .then(function(doc) {
            if (doc.exists) {
                data.push(doc.data());
            } else {
                console.log("No such document!");
            }
            }).catch(function(error) {
            console.log("Error getting document:", error);
            }); 
        }
        this.setState({tests:data});
    }
    async componentWillMount()
    {
        const tids=await this.getTests();
        this.setState({tids:tids});
        //console.log(tids)
        this.getTestInfo(tids);
    }
    render() {
        return (
        this.state.isFaculty?
            <div className="evaluate tc center">
                <legend className="f1 fw6 ph0 mh0 center">EVAUATION PAGE</legend>
                {
                    this.state.tests.length?
                    <div className='tests'>
                    {
                        this.state.tests.map((x,i)=>
                        {
                            return  <div className="test shadow-5 pa3 br3 ma5">
                                        <label className="db fw6 lh-copy f2">{x.course}</label>
                                        <label className=" fw6 lh-copy f4">Max Score : {x.maxScore}</label>
                                        <label className="db fw6 lh-copy f4">Sections : {x.sections.length}</label>
                                        <label className="db fw6 lh-copy f4">Date : {x.date}</label>
                                        <input
                                            onClick={this.evaluate}
                                            className="b br-pill ph3 pv2 input-reset ba white bg-dark-gray grow pointer f6 dib submit"
                                            type="submit"
                                            value="Evaluate"
                                            name={i}
                                        />
                                        <input
                                            onClick={this.updateSubmissions}
                                            className="b br-pill ph3 pv2 input-reset ba white bg-purple grow pointer f6 dib submit"
                                            type="submit"
                                            value="Update Scores"
                                            name={i}
                                        />
                                    </div>
                        })
                    }
                    </div>
                    :
                    <div className='loader'>LOADING</div>
                }
            <Link to="/faculty">
                <input
                className="ma4 ph3 br3 white bg-dark-blue pv2 input-reset ba grow pointer f4 dib x"
                type="submit"
                value="Back"
                />
            </Link>
            </div>:
            <div>
                <legend className="f1 fw6 ph0 mh0">Sign in as faculty required</legend>
            </div>
        );
    }
}

export default Evaluate;