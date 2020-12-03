import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { FaTwitter } from 'react-icons/fa';
import { BsSearch, BsPeople, BsChat } from 'react-icons/bs';
import TwitterLogo from '../../styles/assets/twitter.svg';

import '../../styles/design/landing.css';

const Landing = (props) => {
   return (
      <Grid container direction="row-reverse">
         <Grid item xs={12} sm={12} md={6}>
            <div className="right">
               <div className="center">
                  <div className="center-wrapper">
                     <div className="content">
                        <FaTwitter style={{ fontSize: 41 }} />
                        <h1>
                           See what's happening in
                           <br />
                           the world right now
                        </h1>
                        <div className="mb-15">
                           <span>Join Twitter today.</span>
                        </div>

                        <div className="mb-15 h-30">
                           <Button
                              className="tweet-button"
                              type="submit"
                              size="large"
                              fullWidth
                           >
                              Sign Up
                           </Button>
                        </div>

                        <div className="mb-15 h-30">
                           <Button
                              className="tweet-button-outline button-text-primary"
                              component={RouterLink}
                              to="/login"
                              fullWidth
                              size="large"
                           >
                              Log in
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Grid>
         <Grid item xs={12} sm={12} md={6}>
            <div className="left">
               <img src={TwitterLogo} className="background-image" alt="" />

               <div className="items-wrapper">
                  <div className="item">
                     <span className="icon">
                        <BsSearch />
                     </span>
                     <span className="item-label">Follow your interests.</span>
                  </div>
                  <div className="item">
                     <span className="icon">
                        <BsPeople />
                     </span>
                     <span className="item-label">
                        Hear what people are talking about.
                     </span>
                  </div>
                  <div className="item">
                     <span className="icon">
                        <BsChat />
                     </span>
                     <span className="item-label">Join the conversation.</span>
                  </div>
               </div>
            </div>
         </Grid>
      </Grid>
   );
};

export default Landing;
