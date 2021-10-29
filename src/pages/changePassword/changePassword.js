import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ChangePassword extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isStudent:false,
      isLoggedIn:false,
      email:"",
      data:null
    }
    let token=localStorage.getItem('token');
    if(token)
        this.state.isLoggedIn=true;
    if(token=="student")
      this.state.isStudent=true;
    let email=localStorage.getItem('email');
    this.state.email=email;
    console.log(this.state);
    }
  handleSubmit=async ()=>
  {
    console.log(this.state);
    let email=this.state.email;
    let newPass=this.state.newPass;
    let oldPass=this.state.oldPass;
    let x=false;
    if(this.state.isStudent)
      x=true;

    let d={
    method:"POST",
    body: JSON.stringify(
      {
          Email:email,
          NewPass: newPass,
          OldPass:oldPass,
          Student: x
      }),
    headers:{
      'Content-Type':'application/json'
    }
        }
        await fetch("http://localhost:3000/changePassword",d)
        .then(res=>res.json())
        .then(data=>{
            if(data=="success")
            {
              alert("Password Updated");
              if(this.state.isStudent)
                if(window.location.port){
                  window.location.assign(`http://${window.location.hostname}:${window.location.port}/student`);
                }
                else{
                  window.location.assign(`http://${window.location.hostname}/student`);
                }
              else
                if(window.location.port){
                  window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty`);
                }
                else{
                  window.location.assign(`http://${window.location.hostname}/faculty`);
                }
            }
            else
              alert("Incorrect Old Password")
        })
  
  }
  handleChange = (event) => {
    let val=event.target.name;
    this.setState({ [val]: event.target.value })
}

//  async componentDidMount() {
//   if(this.state.isStudent)
//   {
//     let obj=await this.getData();
//     this.setState({data:obj})
//     localStorage.setItem("id",obj.USN);
//   }
// }
  render() {
    return (
      this.state.isLoggedIn?
      <div>
          <div className="mt3">
              <label className="db fw6 lh-copy f6">Old Password</label>
              <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white x"
                  type="password"
                  name="oldPass"
                  onChange={this.handleChange}
              />
          </div>
          <div className="mt3">
              <label className="db fw6 lh-copy f6">New Password</label>
              <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white x"
                  type="password"
                  name="newPass"
                  onChange={this.handleChange}
              />
          </div>
          <div >
              <input
                  onClick={this.handleSubmit}
                  className="b ph2 pv2 ba b--black bg-transparent grow pointer f6 ma3"
                  type="submit"
                  value="Update Password"
              />
          </div>
      </div>:
      <div>
      <h1>Sign in required</h1>
      </div>
    );
  }
}

export default ChangePassword;