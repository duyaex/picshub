import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BiLogIn} from 'react-icons/bi'
export default function SignUp() {

    const [credentials, setCredentials] = useState({Username:"",email:"",password:"",cpassword:""});
    let history=useNavigate();
   
const handleSubmit=async(e)=>{
e.preventDefault()
const {Username,email,password}=credentials
const response= await fetch("http://localhost:5000/api/auth/createuser",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({Username,email,password})
});

const data= await response.json()
console.log(data)
if(data.success){
    localStorage.setItem("token",data.authtoken)
    history("/login")
}
else{
    alert("Please fill with valid details")
}
  
};
const onChange=(e)=>{
setCredentials({...credentials,[e.target.name]:e.target.value})
}
    return( 
        <>
         
        <div style={{color:"rgb(13, 7, 48)"}} className='container logan'>

        <h3 className='mx-3'>SignUp to the <strong>HUGE</strong> designate Collection</h3>
        <div className="log">
          <p style={{color:"white"}}> Have an account already ? </p>
          <div className="logme">
          
          <button
             
             onClick={() => {
               history("/login");
             }}
             className="join mx-2"
           >
            <BiLogIn/> Login 
           </button>
          </div>
          </div>
        <form  > 
  <div className="form-group my-3">
  <label htmlFor="name">Username</label>
    <input type="name" className="form-control" id="name" onChange={onChange}   minLength={5} required value={credentials.Username}  name='Username' aria-describedby="name" placeholder="Enter your Username"/>
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control my-2" id="email" onChange={onChange}  minLength={5} required name='email' value={credentials.email}  aria-describedby="emailHelp" placeholder="Enter your email"/>
    <label htmlFor="exampleInputEmail1">Password</label>
    <input type="password" className="form-control" id="password"  value={credentials.password} minLength={5} required onChange={onChange} name='password' aria-describedby="emailHelp" placeholder="Enter your password"/>
   
  </div>
  <div className="form-group">
    <label htmlFor="password">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"  value={credentials.cpassword} minLength={5} required onChange={onChange} name='cpassword' placeholder="Confirm your password"/>
  </div>
 
  <button type="submit"  className="joining my-3"onClick={handleSubmit}>SignUp</button>
</form>

</div>




</>
        
        
        
    )


}