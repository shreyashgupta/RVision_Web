import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class FacultyProfile extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isfaculty:false,
      email:"",
      data:null
    }
    let token=localStorage.getItem('token');
    if(token=="faculty")
      this.state.isfaculty=true;
    let email=localStorage.getItem('email');
    this.state.email=email;
    console.log(this.state);
    }
  onSubmit=()=>
  {
    console.log(this.state);
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
   console.log(this.state);
  if(this.state.isfaculty)
  {
    let obj=await this.getData();
    console.log(obj);
    this.setState({data:obj})
  }
}
  render() {
    return (
      this.state.isfaculty?
      this.state.data?
      <div className='faculty tc'>
      <img src={this.state.data.Image}></img><br/>
      <p>FID : {this.state.data.FID}</p>
      <p>Email : {this.state.data.Email}</p>
      <p>Department : {this.state.data.Department}</p>
      <p>Phone Number : {this.state.data.Phone_no}</p>
      <p>Date of Birth : {this.state.data.DoB.substring(0,10)}</p>
      <Link to="/changePassword">
        <input
        className=" br3 ma2 ph3 pv2 input-reset ba b-white white bg-dark-gray grow pointer f6 dib x"
        type="submit"
        value="Change Password"
        />
      </Link><br/>
      <Link to="/faculty">
        <input
          className="b ph3 pv2 input-reset ba white bg-dark-blue br-pill grow pointer f6 dib"
          type="submit"
          value="Back"
        />
      </Link>

      </div>:
      <h1 className='loader'>Loading.....</h1>
      :
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default FacultyProfile;