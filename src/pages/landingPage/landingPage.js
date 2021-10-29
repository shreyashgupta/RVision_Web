import React from "react";
import "tachyons";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../backend/server";
import { getByDisplayValue } from "@testing-library/react";
import Footer from "../../components/Footer/Footer";
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class LandingPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoggedin: false,
    };
    let token = localStorage.getItem("token");
    if (token == null) this.state.isLoggedin = false;
    else this.state.isLoggedin = true;
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    if (window.location.port) {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/`
      );
    } else {
      window.location.assign(`http://${window.location.hostname}/`);
    }
  };
  render() {
    return (
      <div className="lp">
        {this.state.isLoggedin == false ? (
          <>
            <section class="text-gray-600 body-font">
              <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    Welcome to
                    <br class="hidden lg:inline-block" />
                    <span class="text-9xl font-serif text-gray-500">
                      RVison
                    </span>
                  </h1>
                  <p class="mb-8 leading-relaxed">
                    A comprehensive platform for the students of any college to
                    get the best of their knowledge. We provide a platform to
                    the students and Teachers hence reducing the time and effort
                    of the teachers and students. By applying the latest
                    technologies and tools we are able to reduce the gap between
                    the students and the teachers.
                  </p>
                  <div class="flex justify-center">
                    <Link to="/studentSignIn">
                      <button class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Login for Students
                      </button>
                    </Link>
                    <Link to="/facultySignIn">
                      <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                        Login for Teachers
                      </button>
                    </Link>
                  </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/rvision-fd77e.appspot.com/o/Exams-bro%20(1).png?alt=media&token=478ca041-9c98-4b2d-ba0e-24cf62d0307f"
                    class="object-cover object-center rounded"
                    alt="hero"
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
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
        )}
        <script src="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></script>
      </div>
    );
  }
}

export default LandingPage;
