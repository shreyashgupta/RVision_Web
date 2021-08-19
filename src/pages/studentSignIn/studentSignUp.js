import React from 'react';
import 'tachyons';

import {Redirect } from 'react-router-dom';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import DatePicker from 'react-date-picker';
// import CheckboxMultiSelect from '../../components/multiSelect/multiSelect.js';
import MultiSelect from "@khanacademy/react-multi-select";
import Select from 'react-select';
import './style.css'

class StudentSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: '',
            USN:'',
            file:null,
            isAdmin:false,
            passwordc:'',
            phNo:'',
            department:'',
            semester:'',
            courses:[],
            image:'',
            date:new Date(),
            selected:[],
            departments:[]
        }
        const token=localStorage.getItem('token');
        if(token=='admin')
          this.state.isAdmin=true;
    }
    handleFileUpload = (event) => {
        const { file } = this.state;
        if (!file) {
            alert("Upload image and then click on upload button");
        } else {

            const uploadTask = storage.ref(`${file.name}`).put(file);

            uploadTask.on('state_changed',
                (snapShot) => { },
                (error) => { console.log(error) },
                () => {
                    storage
                        .ref('')
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({image: url }, () => console.log(this.state));
                        })
                });
        }
            alert("image uploaded");
    }

    getCourses=async(dept)=>
    {
        let x;
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            Department:dept,
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/getCourses",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
              {
                alert("Error");
              }
              else
                x=data;
          });
        let courses=[];
        for(let i=0;i<x.length;i++)
        {
            courses.push(
            {
                label:x[i].CourseId,
                value:i+1
            })
        }
        return courses;
    }
    logChange=async(val)=> {
        this.setState({department:val['label']})
        let courses=await this.getCourses(val['label']);
        this.setState({courses:courses});
    }
    handleFileChange = (event) => {
        if (event.target.files[0]) {
            this.setState({ file: event.target.files[0] });
        }
    }
    handleChange = (event) => {
        let val=event.target.name;
        this.setState({ [val]: event.target.value })
    }
    async getDepartments()
    {
        let depts;
        let d={
        method:"GET",
        }
        await fetch("http://localhost:3000/getDepartments",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
            {
                alert("couldn't get departments");
            }
            else
            {
                depts=data;
            }
          });
        let departments=[];
        for(let i=0;i<depts.length;i++)
        {
            departments.push(
            {
                label:depts[i].name,
                value:i+1
            })
        }
            return departments;
    }
    async componentWillMount()
    {
        let departments=await this.getDepartments();
        this.setState({departments:departments});
    }
    handleSubmit = async (event) => {
        console.log(this.state);
        const { email,password,fname,lname,passwordc,USN,semester,file,image,department,phNo,date,selected} = this.state;
        for(let i=0;i<selected.length;i++)
            selected[i]=this.state.courses[selected[i]-1].label;
        console.log(selected);
        if(email.length==0 ||fname.length==0 ||lname.length==0 || password.length==0 
            || passwordc.length==0 || USN.length==0 || file==null|| department.length==0)
        alert("Fill all fields")
        else if(password!=passwordc)
            alert("passwords do not match");
        else {
            let flag=false;

               let d={
                    method:"POST",
                    body: JSON.stringify(
                        {
                            Fname:fname,
                            Lname:lname,
                            Image:image,
                            Email:email,
                            Password:password,
                            USN:USN,
                            Semester:semester,
                            Phone_no:phNo,
                            Courses:selected,
                            Department:department,
                            DoB:date
                        }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                        }
                        fetch("http://localhost:3000/studentSignUp",d)
                        .then(res=>res.json())
                        .then(data=>{
                            if(data=="success")
                            {
                                alert("Regitration Success");
                            }
                            else
                                {
                                alert("Something went wrong");
                                }
                        });
                    console.log(this.state);
                        this.setState({
                        email: '',
                        password: '',
                        name: '',
                        Batch:'',
                        USN:''
                        })
                if(window.location.port){
                    window.location.assign(`http://${window.location.hostname}:${window.location.port}/admin`);
                }
                else{
                    window.location.assign(`http://${window.location.hostname}/admin`);
                }
            }
        }
    render() {
        return (
            this.state.isAdmin==true?
            <div className="cover ss center tc">
               
                <label className="f1 fw6 ph0 mh0 tc">Add Student</label>
                    <main className="br4 ma3 shadow-5 center">
                        <div className="l tc center">
                            <div className="mt3 center names">
                                <div className="fname">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b"
                                        type="text"
                                        name="fname"
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="lname">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b"
                                        type="text"
                                        name="lname"
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="email"
                                    name="email"
                                    id="email-address"
                                    onChange={this.handleChange}
                                />
                            </div>
                         <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Semester</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="number"
                                    name="semester"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="phoneNo">USN</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="text"
                                    name="USN"
                                    id="phoneNo"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Department</label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={this.state.departments[1]}
                                    className="x center"
                                    options={this.state.departments}
                                    onChange={this.logChange}
                                />
                            </div>

                            <div className="mv3 center">
                                <label className="db fw6 lh-copy f6">Date of Birth</label>
                                <input
                                    className="pa2 input-reset black ba bg-white y"
                                    type="date"
                                    name="date"
                                    onChange={this.handleChange}
                                 />
                            </div>  
                        </div>
                        <div className="r tc center">
                            <div className="mt3 file center br2">
                                <label className="db fw6 lh-copy f6">Upload Image</label>
                                <input 
                                    type='file' 
                                    onChange={this.handleFileChange} 
                                />
                                <input 
                                    type='button' 
                                    value="Upload"
                                    onClick={this.handleFileUpload}
                                />
                            </div>
                            <div className="mv3"> 
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Select Courses</label>
                            <MultiSelect
                                className="x"
                                options={this.state.courses}
                                selected={this.state.selected}
                                onSelectedChanged={selected => this.setState({selected})}
                            />
                            </div>                          
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Phone Number</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="text"
                                    name="phNo"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b x"
                                    type="password"
                                    name="passwordc"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                        <div >
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
                <Link to="/admin">
                    <input
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Back"
                    />
                </Link>
            </div>:
                  <div>
                    <input
                    onClick={this.handleSignOut}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="signOut"
                    />
                    </div>
        );
    }
}

export default StudentSignUp;