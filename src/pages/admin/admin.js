import React from "react";
import "tachyons";
import { Link } from "react-router-dom";
import SignUp from "../../signUp/SignUp";
import { auth, firestore } from "../../backend/server";

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Admin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAdmin: false,
      email: "",
    };
    let token = localStorage.getItem("token");
    if (token == "admin") this.state.isAdmin = true;
    let email = localStorage.getItem("email");
    this.state.email = email;
  }
  handleSignOut = (event) => {
    auth.signOut();
    localStorage.removeItem("token");
    // localStorage.removeItem('name');
    // localSto=rage.removeItem('phNo');
    // localStorage.removeItem('email');
    alert("Logged out successfully");
    if (window.location.port) {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/`
      );
    } else {
      window.location.assign(`http://${window.location.hostname}/`);
    }
  };
  render() {
    return this.state.isAdmin ? (
      <div className="admin">
        <h1>Signed in as</h1>
        <span className="text-2xl text-blue-400 bg-gray-100 p-2 rounded-md shadow-md">
          {this.state.email}
        </span>
        <SignUp />
      </div>
    ) : (
      <div class="flex flex-row justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-800"></div>
      </div>
    );
  }
}

export default Admin;
