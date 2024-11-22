import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaLock, FaLockOpen } from "react-icons/fa";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...loginData };
    formData[name] = value;
    setLoginData(formData);
  };
  // console.log(loginData);
const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // API call to login user
    const { email, password } = loginData;
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    try {
      console.log("login");
      const api = "https://mern-project-api-azmat-alli-khans-projects.vercel.app/auth/login";

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      // console.log(result);
      const {message , error, success,name} = result

      if(success){
        toast.success(message);
        localStorage.setItem('loggedInUser',name); //  store user in local storage
        setTimeout(() => {
          
          navigate('/home');
        }, 2000);
      }
      else if(error){
        toast.success(error);
      }
       else {
        toast.error(message);
      }
  
    } catch (error) {
      toast.error(error)
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div class="container">
      <div class="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div class="input-box">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Email"
              name="email"
              autoFocus
            />
            <i class="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
            />
            {showPassword ? (
              < FaLockOpen className="eye-icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaLock className="eye-icon" onClick={togglePasswordVisibility} />
            )}
          </div>

          <button type="submit" class="btn">
            Login
          </button>

          <div class="register-link">
            <p>
              Don't have an account? <a href="/signup">Signup</a>
            </p>
          </div>
        </form>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Login;
