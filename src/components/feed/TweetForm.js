import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import './styles/TweetForm.css';

const TweetForm = ({ auth: { user, loading } }) => {
   return (
      <div className="tweetForm">
         <form>
            <div className="tweetForm__input">
               {!loading && user !== null ? (
                  <Avatar
                     style={{ height: '49px', width: '49px' }}
                     src={user.avatar}
                  />
               ) : (
                  <Avatar style={{ height: '49px', width: '49px' }} />
               )}
               <input type="text" placeholder="What's happening?" />
            </div>
            <div className="flex flex-row justify-between tweetForm_actions">
               <div></div>
               <div>
                  <Button className="tweetForm__button">Tweet</Button>
               </div>
            </div>
         </form>
         <div className="tweetForm__bottom-border"></div>
      </div>
   );
};

TweetForm.propTypes = {
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(TweetForm);
