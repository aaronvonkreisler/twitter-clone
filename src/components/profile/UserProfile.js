import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button, IconButton } from '@material-ui/core';
import { FiCamera } from 'react-icons/fi';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import ProfileTabs from './ProfileTabs';
import ProfileTweets from './ProfileTweets';
import ProfileReplies from './ProfileReplies';
import ProfileLikes from './ProfileLikes';
import ProfilePictureModal from '../forms/ProfilePictureModal';
import BackgroundPictureModal from '../forms/BackgroundPictureModal';
import { getProfilePinnedTweet } from '../../actions/profile';
import { prepareProfileData } from '../../actions/profileData';
import '../../styles/design/profile.css';

const UserProfile = ({
   profiles: { currentProfile, loading },
   prepareProfileData,
   getProfilePinnedTweet,
   auth: { user },
}) => {
   const [avatarModalOpen, setAvatarModalOpen] = useState(false);
   const [coverModalOpen, setCoverModalOpen] = useState(false);

   useEffect(() => {
      prepareProfileData(currentProfile);
      getProfilePinnedTweet(currentProfile.screen_name);
   }, [prepareProfileData, currentProfile, getProfilePinnedTweet]);
   return (
      <React.Fragment>
         {loading || currentProfile === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <ProfilePictureModal
                  open={avatarModalOpen}
                  setOpen={setAvatarModalOpen}
                  defaultPicture={currentProfile.avatar}
                  userId={user._id}
               />
               <BackgroundPictureModal
                  open={coverModalOpen}
                  setOpen={setCoverModalOpen}
                  defaultPicture={currentProfile.backgroundPicture}
               />
               <Header leftIcon text={currentProfile.name} />
               <div className="profileWrapper">
                  <div className="coverPhoto__section">
                     <div className="coverPhoto__container">
                        {currentProfile.backgroundPicture && (
                           <img
                              src={currentProfile.backgroundPicture}
                              alt="Background"
                           />
                        )}
                        <IconButton
                           className="coverPhoto__button"
                           onClick={() => setCoverModalOpen(true)}
                        >
                           <FiCamera />
                        </IconButton>
                     </div>
                     <div className="userImage__container">
                        <Avatar
                           src={currentProfile.avatar}
                           alt="User profile"
                        />
                        <IconButton
                           className="profilePictureButton"
                           onClick={() => setAvatarModalOpen(true)}
                        >
                           <FiCamera />
                        </IconButton>
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
export default connect(mapStateToProps, {
   prepareProfileData,
   getProfilePinnedTweet,
})(UserProfile);
