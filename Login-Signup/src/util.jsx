// import {toast} from "react-toastify"

// const handleSuccess = (msg)=> {
//     toast.success(msg),{
//         position : 'top-right'
//     }
// }
// const handleError = (msg)=> {
//     toast.error(msg),{
//         position : 'top-right'
//     }
// }
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Util = ({ setIsAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setIsAuth(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
    
  }, [location, navigate, setIsAuth]);
  return null;
};

export default Util;
