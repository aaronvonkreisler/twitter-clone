import React, { useState } from 'react';
import '../../styles/design/login.css';
import { FaTwitter } from 'react-icons/fa';
import { Button } from '@material-ui/core';
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
               <div className="label-container">
                  <label className="label">
                     <div className="label-sub1">
                        <div className="label-sub2">
                           <span>Email</span>
                           <div className="label-sub3">
                              <div className="label-sub4">
                                 <input
                                    type="text"
                                    className="email-input"
                                    name="email"
                                    value={loginValues.email}
                                    onChange={handleChange}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </label>
               </div>
               <div className="label-container">
                  <label className="label">
                     <div className="label-sub1">
                        <div className="label-sub2">
                           <span>Password</span>
                           <div className="label-sub3">
                              <div className="label-sub4">
                                 <input
                                    type="password"
                                    className="email-input"
                                    name="password"
                                    value={loginValues.password}
                                    onChange={handleChange}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </label>
               </div>
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
