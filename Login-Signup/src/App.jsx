// import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState } from "react";
import Util from "./util";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to={"/login"} />;
  };

  return (
    <div className="app">
      <Util setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
