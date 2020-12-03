import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alerts';
import { FaTwitter } from 'react-icons/fa';
import LoginForm from '../forms/LoginForm';
import '../../styles/design/login.css';

const LoginPage = ({ setAlert }) => {
   return (
      <div className="view-container">
         <div className="container">
            <div className="logo-container">
               <FaTwitter className="logo" />

               <h1>Log in to Tweeter</h1>
            </div>
            <LoginForm />
            <div className="register-container">
               <div className="register">
                  <p>Don't have an account?</p>
                  <Link to="/">Sign up</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default connect(null, { setAlert })(LoginPage);
