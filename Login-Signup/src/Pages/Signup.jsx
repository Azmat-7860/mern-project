import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  let [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name: " + name);
    // console.log("value: " + value);
    const signupData = { ...signupInfo };
    signupData[name] = value;
    setSignupInfo(signupData);
  };
  // console.log(signupInfo);

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password } = signupInfo;
    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }
    try {
      console.log("signup");
      const api = "https://mern-project-backend-azmat-alli-khans-projects.vercel.app/auth/signup";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (error) {
        toast.error(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to signup");
    }
  };
  return (
    <div class="container">
      <div class="wrapper">
        <form onSubmit={handleSignup}>
          <h1>SignUp</h1>
          <div class="input-box">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Username"
              name="username"
              autoFocus
            />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input-box">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Email"
              name="email"
            />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input-box">
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
            />
            <i class="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" class="btn">
            SignUp
          </button>

          <div class="register-link">
            <p>
              Have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
