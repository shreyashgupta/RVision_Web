import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'
import { getByDisplayValue } from '@testing-library/react';

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class LandingPage extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isLoggedin:false,
    }
    let token=localStorage.getItem('token');
    if(token==null)
      this.state.isLoggedin=false;
    else
      this.state.isLoggedin=true;

    }
  handleLogout=()=>
  {
    localStorage.removeItem('token');
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
  render() {
    return (
      <div className='lp'>
      {this.state.isLoggedin==false?
      <div className='lp2'>
      <div className="header">
          <Link to="/">
            <p>CONTACT US</p>
          </Link>
          <Link to="/adminSignIn">
            <p>ADMIN</p>
          </Link>
      </div>
      <div className="bg-img">
        <img src="https://firebasestorage.googleapis.com/v0/b/rvision-fd77e.appspot.com/o/Exams-bro%20(1).png?alt=media&token=478ca041-9c98-4b2d-ba0e-24cf62d0307f"/>
      </div>
      <div className="body">
          <div className='name'>
            <p>RVision</p>
          </div>
          <div className='btns '>
              <Link to="/studentSignIn">
                  <input
                    className=" ph3 pv2 input-reset black b--black bg-transparent grow pointer f6 dib y br-pill"
                    type="submit"
                    value="  STUDENT  "
                  />
              </Link>
              <span> </span>
              <Link to="/facultySignIn">
                  <input
                    className=" ph3 pv2 input-reset black b--black bg-transparent grow pointer f6 dib y br-pill"
                    type="submit"
                    value="  FACULTY  "
                  />
                </Link>
          </div>
      </div>
      </div>:
      <div>
      <h1 className="black">Already Logged in</h1>
      <div>
          <input
            onClick={this.handleLogout}
            className="ph3 pv2 input-reset ba black bg-transparent grow pointer f6 dib br-pill"
            type="submit"
            value="Logout"
          />
      </div>
      </div>
    }
<script src="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></script>
    </div>
    );
  }
}

export default LandingPage;