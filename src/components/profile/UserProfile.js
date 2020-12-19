import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import ProfileTabs from './ProfileTabs';
import ProfileTweets from './ProfileTweets';
import ProfileReplies from './ProfileReplies';
import ProfileLikes from './ProfileLikes';
import { prepareProfileData } from '../../actions/profileData';
import '../../styles/design/profile.css';

const UserProfile = ({
   profiles: { currentProfile, loading },
   prepareProfileData,
}) => {
   useEffect(() => {
      prepareProfileData(currentProfile);
   }, [prepareProfileData, currentProfile]);
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
                              <Link
                                 to={`/profile/${currentProfile.screen_name}/following`}
                              >
                                 <span className="number">
                                    {currentProfile.following.length}
                                 </span>
                                 <span className="text">Following</span>
                              </Link>
                           </div>
                           <div className="item">
                              <Link
                                 to={`/profile/${currentProfile.screen_name}/following`}
                              >
                                 <span className="number">
                                    {currentProfile.followers.length}
                                 </span>
                                 <span className="text">Followers</span>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="profile__tabs feed">
                     <ProfileTabs
                        tab1={<ProfileTweets userId={currentProfile._id} />}
                        tab2={<ProfileReplies userId={currentProfile._id} />}
                        tab3={<ProfileLikes userId={currentProfile._id} />}
                        tab1Text="Tweets"
                        tab2Text="Tweets & replies"
                        tab3Text="Likes"
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
export default connect(mapStateToProps, { prepareProfileData })(UserProfile);
