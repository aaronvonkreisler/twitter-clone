import React, { useState } from 'react';
import '../../styles/design/login.css';
import { FaTwitter } from 'react-icons/fa';
import { Button } from '@material-ui/core';

import TextBox from '../layout/TextBox';

const LoginPage = () => {
   const [loginValues, setLoginValues] = useState({
      email: '',
      password: '',
   });

   const handleChange = (e) => {
      console.log(loginValues);
      setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
   };
   return (
      <div className="view-container">
         <div className="container">
            <div className="logo-container">
               <FaTwitter className="logo" />

               <h1>Log in to Tweeter</h1>
            </div>
            <form>
               <TextBox
                  value={loginValues.email}
                  onChange={handleChange}
                  inputName="email"
                  inputType="email"
                  label="Email"
               />
               <TextBox
                  value={loginValues.password}
                  onChange={handleChange}
                  inputName="password"
                  inputType="password"
                  label="Password"
               />

               <div className="button-wrapper">
                  <div className="button-subWrapper">
                     <Button className="tweet-button" fullWidth>
                        Log in
                     </Button>
                  </div>
               </div>
            </form>
            <div className="register-container">
               <div className="register">
                  <p>Don't have an account?</p>
                  <a href="!#">Sign up</a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
