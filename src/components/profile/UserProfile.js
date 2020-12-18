import React from 'react';

import { connect } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import ProfileTabs from './ProfileTabs';
import ProfileTweets from './ProfileTweets';
import ProfileReplies from './ProfileReplies';
import ProfileLikes from './ProfileLikes';
import '../../styles/design/profile.css';

const UserProfile = ({ profiles: { currentProfile, loading } }) => {
   return (
      <React.Fragment>
         {loading || currentProfile === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header leftIcon text={currentProfile.name} />
               <div className="profileWrapper ">
                  <div className="coverPhoto__container">
                     <div className="userImage__container">
                        <Avatar
                           src={currentProfile.avatar}
                           alt="User profile"
                        />
                     </div>
                  </div>
                  <div className="profileTop__container">
                     <div className="profileButtons__container">
                        <div className="follow__button">
                           <Button
                              className="tweet-button-outline"
                              fullWidth
                              onClick={() => alert('TODO!!!')}
                           >
                              Edit Profile
                           </Button>
                        </div>
                     </div>
                     <div className="userDetailsContainer">
                        <div className="user__name">
                           <span>{currentProfile.name}</span>
                        </div>
                        <div className="screen__name">
                           <span>@{currentProfile.screen_name}</span>
                        </div>
                        {/* Users Bio, location and joined date goes here */}

                        <div className="following__container">
                           <div className="item">
                              <span className="number">
                                 {currentProfile.following.length}
                              </span>
                              <span className="text">Following</span>
                           </div>
                           <div className="item">
                              <span className="number">
                                 {currentProfile.followers.length}
                              </span>
                              <span className="text">Followers</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="profile__tabs feed">
                     <ProfileTabs
                        tweets={<ProfileTweets userId={currentProfile._id} />}
                        replies={<ProfileReplies userId={currentProfile._id} />}
                        likes={<ProfileLikes userId={currentProfile._id} />}
                     />
                  </div>
               </div>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profiles: state.profiles,
});
export default connect(mapStateToProps)(UserProfile);
