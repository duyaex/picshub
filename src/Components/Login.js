
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./StartUp.css"
export default function Login() {
  
const [credentials, setCredentials] = useState({email:"",password:""});
let history=useNavigate();

const handleSubmit=async(e)=>{
e.preventDefault()
const response= await fetch("http://localhost:5000/api/auth/login",{

  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({email:credentials.email,password:credentials.password})
});

const data= await response.json()
console.log(data)
  if(data.success){
    localStorage.setItem("token",data.authtoken)
    history("/")
  }
  else{
    alert("Invalid credentials")
  }
};
const onChange=(e)=>{
setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    
            <>
           
            <div style={{color:"rgb(13, 7, 48)"}} className='container loga'>
              <h3 className='mx-3'>Login to the <strong>HUGE</strong> designate Collection</h3>
  <form className='container my-3' >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email"name='email' aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"onChange={onChange} value={credentials.password} name='password'id="password"/>
  </div>
  
  <button type="submit" className="joining"onClick={handleSubmit}>Login</button>
</form>
  
</div>
  
  
  
  
  </>
)
}
