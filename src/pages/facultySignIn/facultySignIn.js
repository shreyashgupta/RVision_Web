import React from 'react';
import 'tachyons';
import './style.css';

class FacultySignIn extends React.Component {
 constructor(props) {
        super(props)
        this.onSubmitSignIn=this.onSubmitSignIn.bind(this);
        this.onSubmitSignIn=this.onSubmitSignIn.bind(this);
        this.state = {
            email: '',
            password: '',
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
  handleChange = (event) => {    
      let val=event.target.name;
      this.setState({ [val]: event.target.value })
  }
  onSubmitSignIn = async(event) => {
      event.preventDefault();

      const { email, password } = this.state;
      console.log(this.state)
      let d={
              method:"POST",
              body: JSON.stringify(
              {
                  Email:email,
                  Password:password,
              }),
            headers:{
              'Content-Type':'application/json'
            }
          }
          await fetch("http://localhost:3000/facultySignIn",d)
          .then(res=>res.json())
          .then(data=>{
            if(data=='success')
              {
                localStorage.setItem('token',"faculty");
                localStorage.setItem('email',email);
              }
              else
                alert(data);
          });
      this.setState({
        email:'',
        password:''
      })
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/faculty`);
      }
  }
  render() {
    const { onRouteChange } = this.props;
    return (
      this.state.loggedIn==false?
      <div className='signin'>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center login">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Faculty Login</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b w-100 x"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100 x"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
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
      </article></div>:
      <div>
              <input
                onClick={this.handleLogout}
                className="b br-pill ph3 pv2 input-reset ba white bg-dark-red grow pointer f6 dib"
                type="submit"
                value="signOut"
              />
      </div>
    );
  }
}

export default FacultySignIn;