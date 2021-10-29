import React from 'react';
import 'tachyons';
import { auth , firestore} from '../../backend/server';
class AdminSignIn extends React.Component {
 constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            currentUser: {},
            history: props.history,
            loggedIn:false,
        }
        const token=localStorage.getItem('token');
        if(token==null)
        {
          this.state.loggedIn=false;
        }
        else
          this.state.loggedIn=true;
    }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = async(event) => {
      event.preventDefault();

      const { email, password } = this.state;
      console.log(this.state)
      try {
          await auth.signInWithEmailAndPassword(email, password);
          // for(let i=0;i<1000;i++)
          //   for(let j=0;j>5;j++);
          // console.log(this.state.users);
          //alert(`Logged in as Employer successfully`);
          localStorage.setItem('token',"admin");
          localStorage.setItem('email',email);
          alert("SignedIn as admin")
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/admin`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/admin`);
      }
      } catch (error) {
          console.log(error);
          alert(error.message);
      }
  }

  render() {
    return (
      this.state.loggedIn==false?
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center login">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Admin Login</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b w-100 x"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b w-100 x"
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
                className="b br-pill ph3 pv2 input-reset ba white bg-dark-green grow pointer f6 dib x"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </main>
      </article>:
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