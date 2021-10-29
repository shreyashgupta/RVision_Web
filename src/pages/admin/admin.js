import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Admin extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isAdmin:false,
      email:""
    }
    let token=localStorage.getItem('token');
    if(token=="admin")
      this.state.isAdmin=true;
    let email=localStorage.getItem('email');
    this.state.email=email;

    }
  handleSignOut = (event) => {
      auth.signOut();
      localStorage.removeItem('token');
      // localStorage.removeItem('name');
      // localSto=rage.removeItem('phNo');
      // localStorage.removeItem('email');
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
  render() {
    return (
      this.state.isAdmin?
      <div className='admin'>
      <h1>Signed In as <br/>{this.state.email}</h1>
      <div>
      <Link to="studentSignUp">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma5"
            type="submit"
            value="Add new student"
          />
      </Link>
      <Link to="facultySignUp">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma5"
            type="submit"
            value="Add new Faculty"
          />
      </Link>
        <input
          onClick={this.handleSignOut}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma5"
          type="submit"
          value="Logout"
        />
        </div>
      </div>:
      <div>
      <h1>Sign in as admin required</h1>
      </div>
    );
  }
}

export default Admin;