import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Student extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isStudent:false,
      email:"",
      data:null
    }
    let token=localStorage.getItem('token');
    if(token=="student")
      this.state.isStudent=true;
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
          await fetch("http://localhost:3000/student/viewProfile",d)
          .then(res=>res.json())
          .then(data=>{
            obj=data;
          })
      //console.log(obj);
      return obj
  }
 async componentDidMount() {
  if(this.state.isStudent)
  {
    let obj=await this.getData();
    this.setState({data:obj})
    localStorage.setItem("id",obj.USN);
  }
}
  render() {
    return (
      this.state.isStudent?
      this.state.data?
      <div className='student tc'>
      {
      this.state.data?
      <div className='Info center shadow-5'>
        <div className='Image'>
          <img src={this.state.data.Image}/>
        </div>
        <div className='ID'>
          <p className="name">{this.state.data.Fname} {this.state.data.Lname}</p>
          <p>{this.state.data.USN}</p>
          <div>
              {/* <Link to="/student/viewProfile">
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
          <Link to="/student/viewTests">
            <div className='clipart'>
              <img src='https://img.freepik.com/free-vector/hand-drawn-checklist-background_23-2148070711.jpg?size=338&ext=jpg'/>
            </div>
            <div className='title'>
              <p>View Scheduled Tests</p>
            </div>
          </Link>
        </div>
      
        <div className="btnCard shadow-5 br3">
        <Link to="/student/studentReport">
          <div className='clipart'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4VyaCaWEbcvxVNYWs0WOuF8hwLZNQ7fjlw&usqp=CAU'/>
          </div>
          <div className='title'>
            <p>View Report</p>
          </div> 
        </Link>
      </div>
      </div>
      
      </div>:
      <h1 className='loader'>Loading.....</h1>
      :
      <div>
      <h1>Sign in as Student required</h1>
      </div>
    );
  }
}

export default Student;