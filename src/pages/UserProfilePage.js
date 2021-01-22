import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { BsCalendar, BsLink45Deg } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import Moment from 'react-moment';

import Header from '../components/layout/Header';
import Spinner from '../components/layout/Spinner';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileTweets from '../components/profile/ProfileTweets';
import ProfileReplies from '../components/profile/ProfileReplies';
import ProfileLikes from '../components/profile/ProfileLikes';
import ProfilePictureModal from '../components/forms/ProfilePictureModal';
import BackgroundPictureModal from '../components/forms/BackgroundPictureModal';
import EditProfileModal from '../components/forms/EditProfileModal';
import { getProfilePinnedTweet } from '../actions/profile';

import '../styles/design/profile.css';

const UserProfilePage = ({
   profiles: { currentProfile, loading },

   getProfilePinnedTweet,
   auth: { user },
}) => {
   const [avatarModalOpen, setAvatarModalOpen] = useState(false);
   const [coverModalOpen, setCoverModalOpen] = useState(false);
   const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

   useEffect(() => {
      currentProfile !== null
         ? (document.title = `${currentProfile.name} (@${currentProfile.screen_name})`)
         : (document.title = 'Tweeter');
   }, [currentProfile]);

   useEffect(() => {
      getProfilePinnedTweet(currentProfile.screen_name);
   }, [currentProfile, getProfilePinnedTweet]);
   return (
      <React.Fragment>
         {loading || currentProfile === null || user === null ? (
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
               <EditProfileModal
                  open={editProfileModalOpen}
                  setOpen={setEditProfileModalOpen}
                  profile={currentProfile}
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
                     </div>
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
                              onClick={() => setEditProfileModalOpen(true)}
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
                        {currentProfile.bio && (
                           <div className="profileBio">
                              <span>{currentProfile.bio}</span>
                           </div>
                        )}
                        <div className="locationAndJoinedDate">
                           {currentProfile.location && (
                              <span className="locationItem">
                                 <HiOutlineLocationMarker />
                                 <span>{currentProfile.location}</span>
                              </span>
                           )}
                           {currentProfile.website && (
                              <span className="locationItem">
                                 <BsLink45Deg />
                                 <a
                                    className="link"
                                    href={currentProfile.website}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                 >
                                    {currentProfile.website}
                                 </a>
                              </span>
                           )}
                           {currentProfile.createdAt && (
                              <span className="locationItem">
                                 <BsCalendar />
                                 <span>
                                    Joined{' '}
                                    <Moment format="MMMM YYYY">
                                       {currentProfile.createdAt}
                                    </Moment>
                                 </span>
                              </span>
                           )}
                        </div>
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
                        tab1={
                           <ProfileTweets
                              userId={currentProfile._id}
                              authId={user._id}
                           />
                        }
                        tab2={
                           <ProfileReplies
                              userId={currentProfile._id}
                              authId={user._id}
                           />
                        }
                        tab3={
                           <ProfileLikes
                              userId={currentProfile._id}
                              authId={user._id}
                           />
                        }
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
   getProfilePinnedTweet,
})(UserProfilePage);
