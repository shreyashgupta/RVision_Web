import React from "react";
import "tachyons";
import { Link, Redirect } from "react-router-dom";
import CardData from "../../components/CardData/CardData.js";
import { auth, firestore } from "../../backend/server";
import "./style.css";

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Faculty extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFaculty: false,
      email: "",
      data: null,
    };
    let token = localStorage.getItem("token");
    if (token == "faculty") this.state.isFaculty = true;
    let email = localStorage.getItem("email");
    this.state.email = email;
    console.log(this.state);
  }
  onSubmit = () => {
    console.log(this.state);
  };
  onSignOut = (event) => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    if (window.location.port) {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/`
      );
    } else {
      window.location.assign(`http://${window.location.hostname}/`);
    }
  };
  getData = async () => {
    let email = this.state.email;
    let obj;
    let d = {
      method: "POST",
      body: JSON.stringify({
        Email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:3000/faculty/viewProfile", d)
      .then((res) => res.json())
      .then((data) => {
        obj = data;
      });
    //console.log(obj);
    return obj;
  };
  async componentDidMount() {
    if (this.state.isFaculty) {
      let obj = await this.getData();
      this.setState({ data: obj });
      console.log(obj);
      localStorage.setItem("id", obj.FID);
    }
  }
  render() {
    return this.state.isFaculty ? (
      this.state.data ? (
        <div className="faculty tc">
          {this.state.data ? (
            <div className="Info center">
              <CardData props={this.state.data} />
            </div>
          ) : (
            <div />
          )}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Faculty Dashboard
                </h1>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                  You can add questions, create tests, add categories and
                  evaluate students.
                </p>
              </div>
              <div className="flex flex-wrap -m-4">
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Add Question
                    </h2>
                    <p className="leading-relaxed text-base">
                      Add questions to the database.
                    </p>
                    <Link to="/faculty/createQuestion">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Add questions
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Add Category
                    </h2>
                    <p className="leading-relaxed text-base">
                      Add categories to the database.
                    </p>
                    <Link to="/faculty/addCategory">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Add Category
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Create Test
                    </h2>
                    <p className="leading-relaxed text-base">
                      Create a test and add questions to it.
                    </p>
                    <Link to="/faculty/createTest">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Create test
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Subjective Evaluation
                    </h2>
                    <p className="leading-relaxed text-base">
                      Evaluate students' Subjective performance in a test.
                    </p>
                    <Link to="/faculty/subjectiveEvaluation">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Subjective Evaluation
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Evaluate Test
                    </h2>
                    <p className="leading-relaxed text-base">
                      Evaluate students' performance in a test.
                    </p>
                    <Link to="/faculty/evaluate">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Evaluate
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      Test Summary{" "}
                    </h2>
                    <p className="leading-relaxed text-base">
                      View test summary.
                    </p>
                    <Link to="/faculty/facultyTestSummary">
                      <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
                        Test Summary
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-800"></div>
        </div>
      )
    ) : (
      <div>
        <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default Faculty;
