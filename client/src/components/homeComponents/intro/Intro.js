import React from "react";
import "./intro.css";
import SignIn from '../../../components/Log/SignInForm'

const intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <div className="i-title">
            <div className="i-title-wrapper">
            <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
              <div className="i-title-item"><h1>React Js</h1></div>
              <div className="i-title-item"><h1>Node JS</h1></div>
              <div className="i-title-item"><h1>Mongoose</h1></div>
              <div className="i-title-item"><h1>Python</h1></div>
              <div className="i-title-item"><h1>C++</h1></div>
              <div className="i-title-item"><h1>Java</h1></div>
            </div>
          </div>
        </div>
      </div>
      <div className="i-right">
      <SignIn/>
      </div>
    </div>
  );
};

export default intro;
