import React from "react";
import "tachyons";
import { auth, firestore } from "../../backend/server";
class AdminSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: {},
      history: props.history,
      loggedIn: false,
    };
    const token = localStorage.getItem("token");
    if (token == null) {
      this.state.loggedIn = false;
    } else this.state.loggedIn = true;
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    console.log(this.state);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // for(let i=0;i<1000;i++)
      //   for(let j=0;j>5;j++);
      // console.log(this.state.users);
      //alert(`Logged in as Employer successfully`);
      localStorage.setItem("token", "admin");
      localStorage.setItem("email", email);
      alert("SignedIn as admin");
      if (window.location.port) {
        window.location.assign(
          `http://${window.location.hostname}:${window.location.port}/admin`
        );
      } else {
        window.location.assign(`http://${window.location.hostname}/admin`);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  render() {
    return this.state.loggedIn == false ? (
      <div className="min-h-screen">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center login">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Admin Login</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent p-2 rounded-sm bg-gray-50 m-2 w-80 h-12"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent p-2 rounded-sm bg-gray-50 m-2 w-80 h-12"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="mv3">
                <input
                  onClick={this.onSubmitSignIn}
                  class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 p-3 rounded-md shadow-lg active:scale-90"
                  type="submit"
                  value="Sign in"
                />
              </div>
            </div>
          </main>
        </article>
        <div class="lg:absolute bottom-0 right-0 max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/rvision-fd77e.appspot.com/o/Exams-bro%20(1).png?alt=media&token=478ca041-9c98-4b2d-ba0e-24cf62d0307f"
            class="object-cover object-center rounded"
            alt="hero"
          />
        </div>
      </div>
    ) : (
      <div>
        <input
          className="b br3 ph3 pv2 input-reset ba white bg-dark-red grow pointer f6 dib"
          type="submit"
          value="signOut"
        />
      </div>
    );
  }
}

export default AdminSignIn;
