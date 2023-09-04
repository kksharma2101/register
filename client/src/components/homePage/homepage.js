import React from "react";
import "./homepage.css";


const HomePage = ({ setLoginUser }) => {

  return (
    <div className="homepage">
      <h1>Hello Learner's</h1>
      <button className="logout-button" onClick={() => setLoginUser({})}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
