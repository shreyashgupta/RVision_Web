import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Faculty extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isFaculty:false,
      email:"",
      data:null
    }
    let token=localStorage.getItem('token');
    if(token=="faculty")
      this.state.isFaculty=true;
    let email=localStorage.getItem('email');
    this.state.email=email;
    console.log(this.state);
    }
  onSubmit=()=>
  {
    console.log(this.state);
  }
  onSignOut = (event) => {
      localStorage.removeItem('token');
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
  getData=async()=>
  {
      let email=this.state.email;
      let obj;
      let d={
      method:"POST",
      body: JSON.stringify(
        {
            Email:email,
        }),
      headers:{
        'Content-Type':'application/json'
      }
          }
          await fetch("http://localhost:3000/faculty/viewProfile",d)
          .then(res=>res.json())
          .then(data=>{
            obj=data;
          })
      //console.log(obj);
      return obj
  }
 async componentDidMount() {
  if(this.state.isFaculty)
  {
    let obj=await this.getData();
    this.setState({data:obj})
    console.log(obj);
    localStorage.setItem("id",obj.FID);
  }
}
  render() {
    return (
      this.state.isFaculty?
      this.state.data?
      <div className='faculty tc'>
      {
      this.state.data?
      <div className='Info center shadow-5'>
        <div className='Image'>
          <img src={this.state.data.Image}/>
        </div>
        <div className='ID'>
          <p className="name">{this.state.data.Fname} {this.state.data.Lname}</p>
          <p>{this.state.data.FID}</p>
          <div>
              {/* <Link to="/faculty/viewProfile">
                <input
                className=" br3 ma2 ph3 pv2 input-reset ba b-white white bg-dark-gray grow pointer f4 dib x"
                type="submit"
                value="View Profile"
                />
              </Link> */}
              <input
                onClick={this.onSignOut}
                className="ph3 pv2 input-reset ba white bg-dark-red grow pointer f4 dib br3"
                type="submit"
                value="Logout"
              />
          </div>
        </div>
      </div>:<div/>
      }
      <div className='facultybtns center tc'>              
          <div className="btnCard shadow-5 br3">
            <Link to="/faculty/createQuestion">
            
            <div className='title'>
              <p style={{'text-decoration': 'none'}}>Add Question</p>
            </div>
            </Link>
          </div>


          <div className="btnCard shadow-5 br3"> 
          <Link to="/faculty/addCategory">
            
            <div className='title'>
              <p>Add Category</p>
            </div>
          </Link>
          </div>
          <div className="btnCard shadow-5 br3"> 
          <Link to="/faculty/createTest">
            
            <div className='title'>
              <p>Create Test</p>
            </div>
          </Link>
          </div>
        
        
        <div className="btnCard shadow-5 br3">
          <Link to="/faculty/subjectiveEvaluation">
            
            <div className='title'>
              <p>Subjective Evaluation</p>
            </div>
          </Link>
          </div>
        
        
          <div className="btnCard shadow-5 br3">
            <Link to="/faculty/evaluate">
              
              <div className='title'>
                <p>Evaluate</p>
              </div>
            </Link>
          </div>
          <div className="btnCard shadow-5 br3">
          <Link to="/faculty/facultyTestSummary">
            
            <div className='title'>
              <p>Test Summary</p>
            </div>
          </Link>
        </div>
      </div>

      </div>:
      <h1 className='loader'>Loading.....</h1>
      :
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default Faculty;