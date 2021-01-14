import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Avatar, Button } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import { BsCalendar, BsLink45Deg } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import {
   getUserByUsername,
   followUser,
   unfollowUser,
   clearProfileState,
   getProfilePinnedTweet,
} from '../actions/profile';
import { getOrCreateChat } from '../actions/chats';

import Header from '../components/layout/Header';
import Spinner from '../components/layout/Spinner';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileTweets from '../components/profile/ProfileTweets';
import ProfileReplies from '../components/profile/ProfileReplies';
import ProfileLikes from '../components/profile/ProfileLikes';
import FollowingButton from '../components/layout/FollowingButton';
import ReplyModal from '../components/forms/ReplyModal';

import '../styles/design/profile.css';
import '../styles/design/utils.css';

const SelectedProfile = ({
   getUserByUsername,
   clearProfileState,
   getProfilePinnedTweet,
   unfollowUser,
   followUser,
   profiles: {
      profile,
      loading,
      isFollowing,
      isOwnProfile,
      followersCount,
      followingCount,
   },
   auth: { user },
   getOrCreateChat,
}) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [tweetForModal, setTweetForModal] = useState(null);
   const { username } = useParams();
   let history = useHistory();

   useEffect(() => {
      getUserByUsername(username, user._id);
      getProfilePinnedTweet(username);

      return function cleanup() {
         clearProfileState();
      };
   }, [
      getUserByUsername,
      getProfilePinnedTweet,
      username,
      user._id,
      clearProfileState,
   ]);

   if (isOwnProfile) {
      return <Redirect to="/profile" />;
   }

   const handleCommentClick = (tweet) => {
      setTweetForModal(tweet);
      setModalOpen(true);
   };

   return (
      <div>
         {loading || profile === null || user === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <ReplyModal
                  tweet={tweetForModal}
                  open={modalOpen}
                  setOpen={setModalOpen}
               />
               <Header leftIcon text={profile.name} />
               <div className="profileWrapper ">
                  <div className="coverPhoto__section">
                     <div className="coverPhoto__container">
                        {profile.backgroundPicture && (
                           <img
                              src={profile.backgroundPicture}
                              alt="Background"
                           />
                        )}
                     </div>
                     <div className="userImage__container">
                        <Avatar src={profile.avatar} alt="User profile" />
                     </div>
                  </div>
                  <div className="profileTop__container ">
                     <div className="profileButtons__container">
                        <button
                           className="icon-button"
                           onClick={() => getOrCreateChat(profile._id, history)}
                        >
                           <FiMail />
                        </button>
                        <div className="follow__button">
                           {isFollowing ? (
                              <FollowingButton
                                 onClick={() => unfollowUser(profile._id)}
                              />
                           ) : (
                              <Button
                                 className="tweet-button-outline"
                                 fullWidth
                                 onClick={() => followUser(profile._id)}
                              >
                                 Follow
                              </Button>
                           )}
                        </div>
                     </div>
                     <div className="userDetailsContainer">
                        <div className="user__name">
                           <span>{profile.name}</span>
                        </div>
                        <div className="screen__name">
                           <span>@{profile.screen_name}</span>
                        </div>
                        {/* Users Bio, location and joined date goes here */}
                        {profile.bio && (
                           <div className="profileBio">
                              <span>{profile.bio}</span>
                           </div>
                        )}
                        <div className="locationAndJoinedDate">
                           {profile.location && (
                              <span className="locationItem">
                                 <HiOutlineLocationMarker />
                                 <span>{profile.location}</span>
                              </span>
                           )}
                           {profile.website && (
                              <span className="locationItem">
                                 <BsLink45Deg />
                                 <a
                                    className="link"
                                    href={profile.website}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                 >
                                    {profile.website}
                                 </a>
                              </span>
                           )}
                           {profile.createdAt && (
                              <span className="locationItem">
                                 <BsCalendar />
                                 <span>
                                    Joined{' '}
                                    <Moment format="MMMM YYYY">
                                       {profile.createdAt}
                                    </Moment>
                                 </span>
                              </span>
                           )}
                        </div>
                        <div className="following__container">
                           <Link
                              to={`/profile/${profile.screen_name}/following`}
                           >
                              <div className="item">
                                 <span className="number">
                                    {followingCount}
                                 </span>
                                 <span className="text">Following</span>
                              </div>
                           </Link>
                           <Link
                              to={`/profile/${profile.screen_name}/following`}
                           >
                              <div className="item">
                                 <span className="number">
                                    {followersCount}
                                 </span>
                                 <span className="text">Followers</span>
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="profile__tabs feed">
                     <ProfileTabs
                        tab1={
                           <ProfileTweets
                              userId={profile._id}
                              onCommentClick={handleCommentClick}
                              authId={user._id}
                           />
                        }
                        tab2={
                           <ProfileReplies
                              userId={profile._id}
                              onCommentClick={handleCommentClick}
                              authId={user._id}
                           />
                        }
                        tab3={
                           <ProfileLikes
                              userId={profile._id}
                              onCommentClick={handleCommentClick}
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
      </div>
   );
};

SelectedProfile.propTypes = {
   getUserByUsername: PropTypes.func.isRequired,
   followUser: PropTypes.func.isRequired,
   unfollowUser: PropTypes.func.isRequired,
   getProfilePinnedTweet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profiles: state.profiles,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getUserByUsername,
   followUser,
   unfollowUser,
   clearProfileState,
   getProfilePinnedTweet,
   getOrCreateChat,
})(SelectedProfile);
