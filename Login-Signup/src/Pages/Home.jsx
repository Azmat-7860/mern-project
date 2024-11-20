import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.getItem("loggedInUser"));
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logout Success");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <div className="container">
      <div className="head">
        <h1 style={{ textTransform: "capitalize", fontSize: "50px" }}>
          Welcome , {user} 🙏
        </h1>
        <br />
        <button className="log-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
