import React from 'react';
import 'tachyons';
import {Redirect } from 'react-router-dom';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import { firestore } from '../../backend/server';
import Select from 'react-select';
import './style.css'
class AddCategory extends React.Component{
  constructor() {
    super();
    this.state=
    {
      isFaculty:false,
      courses:[],
      fid:'',
      course:0,
      available:[],
      category:'',
      forNames:''
    }
    let token=localStorage.getItem('token');
    let fid=localStorage.getItem('id');    
    if(token=="faculty")
    {
      this.state.isFaculty=true;
      this.state.fid=fid;
    }

  }
    handleChange = (event) => {    
        let val=event.target.name;
        this.setState({ [val]: event.target.value })
    }
    getCourses=async()=>
    {
        let x;
        let fid=this.state.fid;
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            FID:fid
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/faculty/getCourses",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
              {
                alert("Error");
              }
              else
                x=data;
          });
        this.setState({forNames:x});
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
    getAvailable=async(i)=>
    {
        var categories=[];
        let cid=this.state.forNames[i-1].CourseId
        console.log(cid);
        await firestore.collection("course").doc(cid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              categories=doc.categories;
              categories=doc.data().categories;
            } else {
              console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          }); 
          console.log(categories);
          return categories;
    }
    getNames=async()=>
    {
        let x;
        let courses=this.state.forNames;
        let d={
        method:"POST",
        body: JSON.stringify(
        {
            Courses:courses
        }),
        headers:{
        'Content-Type':'application/json'
        }
          }
         await fetch("http://localhost:3000/getCoursesName",d)
            .then(res=>res.json())
            .then(data=>{
            if(data=='error')
              {
                alert("Error");
              }
              else
                x=data;
          });
        return x;
    }
  async componentWillMount() {
    console.log(this.state);
    if(this.state.isFaculty)
    {
        
        let courses=await this.getCourses();
        let names=await this.getNames();
        for(let i=0;i<courses.length;i++)
        {
          courses[i].label=courses[i].label +" : "+names[i];
        }
        this.setState({courses:courses});
        console.log(this.state);
    }
}
  handleSubmit = async (event) => {

    console.log(this.state);
      const {course,category} = this.state;
      if(course==0 || category.length==0)
        alert("Invalid Entry");
      else {
              let cid=this.state.forNames[course-1].CourseId;
              let categories=this.state.available;
              categories.push(category);
                const courseRef = firestore.collection('course').doc(cid);
                await courseRef.set({
                categories:categories
                });
                console.log("done");
                    alert("Added Category");
                this.setState({course:'', category:''})
                if(window.location.port){
                    window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty`);
                }
                else{
                    window.location.assign(`http://${window.location.hostname}/faculty`);
                }
            }
          }
  logChange=async (event)=>
  {
      this.setState({course:event.value});
      let available=await this.getAvailable(event.value);
      this.setState({available:available});
  }
    render(){
		return(
      this.state.isFaculty?
            <div>
            <h1>Category</h1>
                <article className="br3 ba b--black-10 mv4 tc w-50-m w-25-l mw6 shadow-5 center addc">
                    <main className="pa4 black-80 center">
                      <div className="mv3">
                          <label className="db fw6 lh-copy f6" htmlFor="password">Course</label>
                          <Select
                              name="form-field-name"
                              defaultValue={this.state.courses[1]}
                              className="x center"
                              options={this.state.courses}
                              onChange={this.logChange}
                          />
                      </div>
                      {
                          this.state.available.length?   
                          <div className="mv3  pavailable x">
                              <label className="db fw6 lh-copy f6" htmlFor="password">Available categories</label>
                              <div className='available'>
                              {
                                  this.state.available.map((x,i)=>
                                  {
                                    return <b>{x}</b>
                                  })

                              }
                              </div>
                          </div>:<div/>
                    }
                      <div>
                          <label className="db fw6 lh-copy f6">Category</label>
                          <input
                              className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black b f5"
                              type="text"
                              name="category"
                              onChange={this.handleChange}
                          />
                      </div>
                      <div className='mv3'>
                          <input
                              onClick={this.handleSubmit}
                              className="br-pill b ph3 pv2 input-reset ba white bg-dark-green grow pointer f6 dib"
                              type="submit"
                              value="Create"
                          />
                      </div>
                    </main>
                </article>
                <Link to="/faculty"><input
                    className="b br3 ph3 pv2 input-reset ba bg-dark-blue white grow pointer f6 dib ma2"
                    type="submit"
                    value="Back"
                /></Link>
            </div>:<h1>You are not authorized to create question</h1>
    );
  }
}
export default AddCategory;