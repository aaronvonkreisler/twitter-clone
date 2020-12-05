import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTwitter } from 'react-icons/fa';
import LoginForm from '../forms/LoginForm';
import RegisterModal from './RegisterModal';
import '../../styles/design/login.css';

const LoginPage = ({ isAuthenticated }) => {
   const [modalOpen, setModalOpen] = useState(false);
   return (
      <React.Fragment>
         <RegisterModal open={modalOpen} setOpen={setModalOpen} />
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
                     <p
                        className="sign-up-link"
                        onClick={() => setModalOpen(true)}
                     >
                        Sign up
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};

LoginPage.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(LoginPage);
