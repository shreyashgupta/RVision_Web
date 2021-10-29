import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import StudentSignIn from './pages/studentSignIn/studentSignIn.js';
import FacultySignIn from './pages/facultySignIn/facultySignIn.js';
import FacultyProfile from './pages/facultyProfile/facultyProfile.js';
import StudentProfile from './pages/studentProfile/studentProfile.js';
import AdminSignIn from './pages/adminSignIn/adminSignIn.js';
import Admin from './pages/admin/admin.js';
import FacultySignUp from './pages/facultySignUp/facultySignUp.js';
import StudentSignUp from './pages/studentSignUp/studentSignUp.js';
import LandingPage from './pages/landingPage/landingPage.js';
import AddCategory from './pages/addCategory/addCategory.js';
import Faculty from './pages/faculty/faculty.js';
import Student from './pages/student/student.js';
import Navbar from './components/navbar/navbar.js';
import CreateQuestion from './pages/createQuestion/createQuestion.js'
import CreateTest from './pages/createTest/createTest.jsx'
import AttemptTest from './pages/attemptTest/attemptTest.jsx'
import ViewTests from './pages/viewTests/viewTests.js'
import SubjectiveEvaluation from './pages/subjectiveEvaluation/subjectiveEvaluation.js'
import Evaluate from './pages/evaluate/evaluate.js'
import FacultyTestSummary from './pages/facultyTestSummary/facultyTestSummary.js'
import StudentReport from './pages/studentReport/studentReport.js'
import ViewSubmission from './pages/viewSubmission/viewSubmission.jsx'
import ChangePassword from './pages/changePassword/changePassword.js'
// import Map from './components/Map.js';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/studentSignIn'>
            <StudentSignIn />
          </Route>
          <Route exact path='/facultySignIn'>
            <FacultySignIn/>
          </Route>
          <Route exact path='/facultySignUp'>
            <FacultySignUp/>
          </Route>
          <Route exact path='/studentSignUp'>
            <StudentSignUp/>
          </Route>
          <Route exact path='/faculty'>
            <Faculty/>
          </Route>
          <Route exact path='/faculty/viewProfile'>
            <FacultyProfile/>
          </Route>
            <Route exact path='/student/viewProfile'>
            <StudentProfile/>
          </Route>
          <Route exact path='/faculty/addCategory'>
            <AddCategory/>
          </Route>
          <Route exact path='/student'>
            <Student/>
          </Route>
          <Route exact path='/adminSignIn'>
            <AdminSignIn/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
          </Route>
          <Route exact path='/faculty/createQuestion'>
            <CreateQuestion/>
          </Route>
          <Route exact path='/faculty/createTest'>
            <CreateTest/>
          </Route>
          <Route exact path='/student/viewTests'>
            <ViewTests/>
          </Route>
          <Route exact path='/student/attemptTest'>
            <AttemptTest/>
          </Route>
          <Route exact path='/faculty/subjectiveEvaluation'>
            <SubjectiveEvaluation/>
          </Route>
          <Route exact path='/faculty/evaluate'>
            <Evaluate/>
          </Route>
          <Route exact path='/faculty/facultyTestSummary'>
            <FacultyTestSummary />
          </Route>
          <Route exact path='/student/studentReport'>
            <StudentReport />
          </Route>
          <Route exact path='/student/viewSubmission'>
            <ViewSubmission/>
          </Route>
          <Route exact path='/changePassword'>
            <ChangePassword/>
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
