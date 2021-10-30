import React from "react";
import "tachyons";
import "./style.css";

class FacultySignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };
    const token = localStorage.getItem("token");
    if (token == null) {
      this.state.loggedIn = false;
    } else this.state.loggedIn = true;
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
  handleChange = (event) => {
    let val = event.target.name;
    this.setState({ [val]: event.target.value });
  };
  onSubmitSignIn = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    console.log(this.state);
    let d = {
      method: "POST",
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:3000/facultySignIn", d)
      .then((res) => res.json())
      .then((data) => {
        if (data == "success") {
          localStorage.setItem("token", "faculty");
          localStorage.setItem("email", email);
        } else alert(data);
      });
    this.setState({
      email: "",
      password: "",
    });
    if (window.location.port) {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/faculty`
      );
    } else {
      window.location.assign(`http://${window.location.hostname}/faculty`);
    }
  };
  render() {
    const { onRouteChange } = this.props;
    return this.state.loggedIn == false ? (
      <div className="signin">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center login">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="font-normal text-5xl">Faculty Login</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent p-2 rounded-sm bg-gray-50 m-2 w-80 h-12"
                    type="email"
                    name="email"
                    id="email-address"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  />
                </div>
              </fieldset>
              <input
                onClick={this.onSubmitSignIn}
                class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 p-3 rounded-md shadow-lg active:scale-90"
                type="submit"
                value="Sign In"
              />
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
      <div className="min-h-screen">
        <h1>You are already logged in as </h1>
        <span className="text-2xl text-blue-400">
          {localStorage.getItem("token")}
        </span>
        <input
          className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
          onClick={this.handleLogout}
          type="submit"
          value="signOut"
        />
      </div>
    );
  }
}

export default FacultySignIn;
