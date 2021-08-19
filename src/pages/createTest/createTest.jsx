import React, { useState, useEffect } from "react";
import { firestore } from "../../backend/server";
import Select from "react-select";
import "tachyons";
import { Link } from "react-router-dom";
import AddSection from "./TestSection/AddSection";
import Section from "./TestSection/Section";
import "./createTest.css";
export default function TestType() {
  let currentDate = new Date().toISOString().slice(0, 10);

  let getCategories = async (cid) => {
    let categories;
    //while(!mcqDoc.course.length);
    if (cid.length) {
      await firestore
        .collection("course")
        .doc(cid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            let x = doc.data().categories;
            let categories = [];
            for (let i = 0; i < x.length; i++) {
              categories.push({
                label: x[i],
                value: i + 1,
              });
            }
            console.log(categories);
            setCategories(categories);
          } else {
            setCategories({});
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          setCategories({});
          console.log("Error getting document:", error);
        });
    }
  };
  let getCourses = async () => {
    let x = [];
    let fid = localStorage.getItem("id");
    let d = {
      method: "POST",
      body: JSON.stringify({
        FID: fid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:3000/faculty/getCourses", d)
      .then((res) => res.json())
      .then((data) => {
        if (data === "error") {
          alert("Error");
        } else {
          x = data;
          let courses = [];
          for (let i = 0; i < x.length; i++) {
            courses.push({
              label: x[i].CourseId,
              value: i + 1,
            });
          }
          setCourses(courses);
        }
      });
  };
  let getCourseQuestions = async (course) => {
    let x = [];
    let d = {
      method: "POST",
      body: JSON.stringify({
        CourseId: course,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:3000/faculty/courseQuestions", d)
      .then((res) => res.json())
      .then((data) => {
        if (data === "error") {
          alert("No questions created for the course!");
        } else {
          setTestType((prevDoc) => {
            return {
              ...prevDoc,
              questions: data,
            };
          });
          console.log(data);
        }
      });
  };
  const [courses, setCourses] = useState({});
  const [categories, setCategories] = useState({});
  const [testType, setTestType] = useState({
    date: currentDate,
    startTime: "00:00:01",
    duration: 1,
    course: "",
    fid: localStorage.getItem("id"),
    semester: 0,
    questions: [],
    //the duration is in minutes
    maxScore: 0,
    //automatically compute max score from the sections added so far
    sections: [],
    //each section is a document
  });
  useEffect(() => {
    getCourses();
  }, []);
  function generateID() {
    var length = 10,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  let noSQL = async (id) => {
    let ref = testType;
    delete ref.questions;
    const testRef = firestore.doc(`test/` + id);
    try {
      await testRef.set(ref);
      console.log("Created Question");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  let sql = async (id) => {
    let d = {
      method: "POST",
      body: JSON.stringify({
        FID: testType.fid,
        TestID: id,
        Semester: testType.semester,
        CourseId: testType.course,
        Date: testType.date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(d.body);
    await fetch("http://localhost:3000/faculty/createTest", d)
      .then((res) => res.json())
      .then((data) => {
        if (data == "success") {
          alert("Creation Successful");
        } else alert("failed");
      });
  };
  async function createTest(event) {
    if (
      testType.course.length == 0 ||
      testType.score == 0 ||
      testType.sections.length == 0
    ) {
      alert("Empty Fields");
      return;
    }
    //make a transaction to both SQL and NOSQL databases
    let id = generateID();

    //ensure that the form criteria is met
    await noSQL(id);
    await sql(id);
    if (window.location.port) {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/faculty`
      );
    } else {
      window.location.assign(`http://${window.location.hostname}/faculty`);
    }
  }

  function dateUpdate(event) {
    let d = event.target.value;
    setTestType((prevdoc) => {
      return {
        ...prevdoc,
        date: d,
      };
    });
  }

  //change the start time of the test
  function changeStartTime(event) {
    let t = event.target.value;
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        startTime: t,
      };
    });
  }
  //change the duration of the test
  function updateDuration(event) {
    let t = event.target.value;
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        duration: t,
      };
    });
  }

  //to add a section
  function addSection(newSection) {
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        sections: [...prevDoc.sections, newSection],
        maxScore:
          prevDoc.maxScore +
          newSection.noOfQuestions * newSection.questionScore,
      };
    });
    console.log(testType.sections);
  }

  //to delete a section
  function deleteSection(id, howManyQuestions, questionScore) {
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        maxScore: prevDoc.maxScore - howManyQuestions * questionScore,
      };
    });

    console.log(id);

    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        sections: prevDoc.sections.filter((item, index) => index !== id),
      };
    });
  }

  function updateCourse(event) {
    let c = event.target.value;
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        course: c,
      };
    });
  }
  function updateSemester(event) {
    let c = event.target.value;
    setTestType((prevDoc) => {
      return {
        ...prevDoc,
        semester: c,
      };
    });
  }
  async function courseChange(event) {
    await setTestType((prevDoc) => {
      return {
        ...prevDoc,
        course: event.label,
      };
    });
    //console.log(mcqDoc);
    await getCategories(event.label);
    await getCourseQuestions(event.label);
  }

  return (
    <div className="tc center ct">
      <label className="f1 fw6 ph0 tc ma4">Create Test</label>
      <div>
        <label className="db fw6 lh-copy f3">
          Total test score: {testType.maxScore}
        </label>
      </div>
      <div className="corques">
        <div className="mv3">
          <label className="db fw6 lh-copy f4 ma1">Course</label>
          <Select
            name="form-field-name"
            className="x center"
            options={courses}
            defaultValue={courses[1]}
            onChange={courseChange}
          />
        </div>
        
        <div class="pa4" >
          <div class="overflow-auto" style={{maxHeight:"250px"}}>
            <table class="f6 w-100 mw8 center" cellspacing="0">
              <thead>
                <tr class="stripe-dark">
                  <th class="fw6 tl pa3 bg-white">Type</th>
                  <th class="fw6 tl pa3 bg-white">Category</th>
                  <th class="fw6 tl pa3 bg-white">Score</th>
                  <th class="fw6 tl pa3 bg-white">Count</th>
                </tr>
              </thead>
              <tbody class="lh-copy">
                {testType.questions.map((x, index) => {
                  return (
                    <tr class="stripe-dark">
                      <td class="pa3">{x.QType}</td>
                      <td class="pa3">{x.Category}</td>
                      <td class="pa3">{x.Score}</td>
                      <td class="pa3">{x.HowMany}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {categories.length ? (
        <div className="addsec shadow-5 br3 pa3">
          <AddSection
            onAdd={addSection}
            categories={categories}
            course={testType.course}
          />
        </div>
      ) : (
        <h1>Select a course</h1>
      )}
      {testType.sections.length ? (
        <div className="addedSections shadow-5 br3 pa3 ma3">
          {testType.sections.map((secItem, index) => {
            return (
              <Section
                key={index}
                id={index}
                item={secItem}
                onDelete={deleteSection}
              />
            );
          })}
        </div>
      ) : (
        <div />
      )}
      <div className="shadow-5 pa3 br3 ma4">
        <div className="meta">
          <div>
            <label className="db fw6 lh-copy f4">Date</label>
            <input
              type="date"
              className="pa1"
              value={testType.date}
              onChange={dateUpdate}
              min={currentDate}
              required
            />
          </div>
          <div>
            <label className="db fw6 lh-copy f4">Time</label>
            <input
              name="startingTime"
              type="time"
              className="pa1 time"
              value={testType.startTime}
              onChange={changeStartTime}
            />
          </div>
          <div>
            <label className="db fw6 lh-copy f4">Duration(min)</label>
            <input
              name="testDuration"
              type="number"
              className="pa1 duration"
              value={testType.duration}
              onChange={updateDuration}
              min="1"
            />
          </div>
          <div>
            <label className="db fw6 lh-copy f4">Semester</label>
            <input
              name="Semester"
              type="number"
              className="pa1 duration"
              value={testType.Semester}
              onChange={updateSemester}
              min="1"
              max="8"
            />
          </div>
        </div>
        <input
          type="submit"
          onClick={createTest}
          value="Create Test"
          className="b br2 pa2  input-reset bg-dark-green white grow pointer f5 dib"
        />
      </div>
      <Link to="/faculty">
        <input
          type="submit"
          value="Back"
          className="b pa2  input-reset bg-dark-blue white br-pill grow pointer f5 dib mv3"
        />
      </Link>
    </div>
  );
}
