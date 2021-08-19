import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';
import TestCard from '../../components/testCard/testCard.jsx';
import {firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ViewTests extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isStudent:false,
      USN:'',
      tests:[],
      testData:[],
      courses:[],
      fetched:false
    }
    let token=localStorage.getItem('token');
    if(token=="student")
      this.state.isStudent=true;
    let email=localStorage.getItem('id');
    this.state.USN=email;
    console.log(this.state);
    }
  getTests=async()=>
  {
      let usn=this.state.USN;
      let obj;
      let d={
      method:"POST",
      body: JSON.stringify(
        {
            USN:usn,
        }),
      headers:{
        'Content-Type':'application/json'
      }
          }
          await fetch("http://localhost:3000/student/getTests",d)
          .then(res=>res.json())
          .then(data=>{
            obj=data;
          })
      
      //let x=new Date(temp.date+'T' + temp.startTime);
      //console.log(obj);
      if(obj=="error")
          return [];
      return obj
  }
  takeTest=(event)=>
  {
    //console.log(this.state.tests,this.state.testData);
    localStorage.setItem('tid',this.state.tests[event.target.name].TestID);
    if(window.location.port){
        window.location.assign(`http://${window.location.hostname}:${window.location.port}/student/attemptTest`);
    }
    else{
        window.location.assign(`http://${window.location.hostname}/student/attemptTest`);
    }
  }
  getNames=async(y)=>
  {
      let x;
      let courses=y;
      let d={
      method:"POST",
      body: JSON.stringify(
      {
          Courses:courses
      }),
      headers:{
      'Content-Type':'application/json'
      }
        }
       await fetch("http://localhost:3000/getCoursesName",d)
          .then(res=>res.json())
          .then(data=>{
          if(data=='error')
            {
              alert("Error");
            }
            else
              x=data;
        });
      return x;
  }
  getTestData=async(testIDs)=>
  {
    let x=[];      
    let y=[];  
    if(testIDs.length)
    {
        for(let i=0;i<testIDs.length;i++)
        {
            await firestore.collection("test").doc(testIDs[i].TestID)
              .get()
              .then(function(doc) {
                if (doc.exists) {
                  x.push(doc.data());
                } else {
                  console.log("No such document!");
                }
              }).catch(function(error) {
                console.log("Error getting document:", error);
              }); 
          }
    }
    let updatedIds=[];
    let updated=[];
    let curr=new Date();
    for(let i=0;i<x.length;i++)
    {
      let temp=new Date(x[i].date+'T' + x[i].startTime);
      //console.log()
      if(curr-temp < x[i].duration*60*1000)
      {
        if(curr>temp)
          x[i].avail=true;
        else
          x[i].vail=false;
        updated.push(x[i]);
        updatedIds.push(this.state.tests[i]);
        y.push({
          CourseId:x[i].course});
        //console.log(x[i]);
      }
      else
        x[i].avail=false;
    }
    this.setState({testData:updated});
    this.setState({tests:updatedIds});
    let names=await this.getNames(y);
    this.setState({courses:names});
  }
  async componentWillMount() {
    if(this.state.isStudent)
    {
      let obj=await this.getTests();
      this.setState({tests:obj});
      if(obj.length)
        await this.getTestData(obj);
      
      await this.setState({fetched:true});
      console.log("here");
    }
  }
  render() {
    return (
      this.state.isStudent?
      <div className="center tc available">
        <legend className="f1 fw6 ph0 mh0 center ma3">Available Tests</legend>
        {
          this.state.fetched?
            <div className="cardList">
            {
              this.state.testData.map((x,i)=>
              {
                  return <TestCard
                            course={x.course}
                            date={x.date}
                            name={this.state.courses[i]}
                            time={x.startTime}
                            duration={x.duration}
                            score={x.maxScore}
                            takeTest={this.takeTest}
                            index={i}
                            avail={x.avail}
                          />
              }
                )
            }
            </div>:<div class="loader">Loading...</div>
          }
      <Link to="/student"><input
      className="b ph3 pv2 input-reset ba  bg-dark-blue white grow pointer f6 dib ma2 br3"
      type="submit"
      value="Back"
      /></Link>
      </div>
      :
      <div>
      <h1>Sign in as Student required</h1>
      </div>
    );
  }
}

export default ViewTests;