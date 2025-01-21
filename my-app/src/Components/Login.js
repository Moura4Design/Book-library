import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLogin = () => {
    console.log('email ==>', email)
    if(email === 'Tania') {
      navigate('/booklist');
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }

  }

  console.log('email 1 ==>', email)
  return(
    <React.Fragment>
      <h3 className="mt-5 mb-5">Login page</h3>
      {errorMessage ? <p className="text-danger">Login Failed.</p> : null}
      <div className="d-flex justify-content-center mb-3">
        <label className="col-sm-2 col-form-label">Email:</label>
        <div className="col-sm-4">
          <input className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <label className="col-sm-2 col-form-label">Password:</label>
        <div className="col-sm-4">
          <input className="form-control" />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-sm-6 d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
      
    </React.Fragment>
  )
}

export default Login;