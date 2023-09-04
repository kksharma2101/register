import { useState } from "react";
import "./App.css";
import HomePage from "./components/homePage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              (user && user._id) ? (<HomePage setLoginUser={setLoginUser} /> ) : (<Login setLoginUser={setLoginUser} />
              )
            }
          />

          <Route
            path="register"
            element={<Register />}
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
