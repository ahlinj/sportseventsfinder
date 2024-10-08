import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration"

class SignupView extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            user:{
                type:"signup",
                isPrivate: 0
            }
        }
    }

    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
          }))
      }
    

      handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const fieldValue = checked ? 1 : 0;
    
        this.setState(prevState => ({
            user:{...prevState.user,[name]:fieldValue}
        }));
      }


    QPostSignup=()=>{
        axios.post(API_URL+'/users/register',{
          username:this.state.user.username,
          name:this.state.user.name,
          surname:this.state.user.surname,
          password:this.state.user.password,
          isPrivate:this.state.user.isPrivate,
          gender:this.state.user.gender,
          age:this.state.user.age,
          email:this.state.user.email,
        })
        .then(response=>{
          console.log("Sent to server...")
        })
        .catch(err=>{
          console.log(err)
        })
      }
      

  render()
  {
    return(
<div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
<form style={{margin:"20px"}} >
  <div className="mb-3">
    <label className="form-label">Username</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Surname</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="surname" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <label className="form-label">Private</label>
    <input onChange={(e)=>this.handleCheckboxChange(e)} name="isPrivate" type="checkbox" className="form-check-input" id="exampleInputEmail11" />
  </div>
  <div className="mb-3">
            <label className="form-label">Gender</label>
            <select onChange={(e)=>this.QGetTextFromField(e)} name="gender" className="form-control" value={this.state.user.gender}>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
          </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="age" type="text" className="form-control" id="exampleInputEmail1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
    </div>
  </div>
</form>
<button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
</div>
    )
  }
}

export default SignupView