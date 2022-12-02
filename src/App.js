import { Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  const [crruntUser, setcrruntUser] = useState(null)


  function decodeToken() {
    let decodeToken = jwtDecode(localStorage.getItem("userToken"));
    setcrruntUser(decodeToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      decodeToken();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login decodeToken={decodeToken} />} />
        <Route path="/login" element={<Login decodeToken={decodeToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nexisltd" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
