import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import {
   getUserByUsername,
   followUser,
   unfollowUser,
   clearProfileState,
} from '../../actions/profile';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import ProfileTabs from './ProfileTabs';
import ProfileTweets from './ProfileTweets';
import ProfileReplies from './ProfileReplies';
import ProfileLikes from './ProfileLikes';
import FollowingButton from '../layout/FollowingButton';
import OutlineButton from '../layout/OutlineButton';
import '../../styles/design/profile.css';
import '../../styles/design/utils.css';

const SelectedProfile = ({
   getUserByUsername,
   clearProfileState,
   unfollowUser,
   followUser,
   match,
   profiles: {
      profile,
      loading,
      isFollowing,
      isOwnProfile,
      followersCount,
      followingCount,
   },
   auth,
}) => {
   useEffect(() => {
      getUserByUsername(match.params.username, auth.user._id);

      return function cleanup() {
         clearProfileState();
      };
   }, [
      getUserByUsername,
      match.params.username,
      auth.user._id,
      clearProfileState,
   ]);

   return (
      <div>
         {loading || profile === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header leftIcon text={profile.name} />
               <div className="profileWrapper ">
                  <div className="coverPhoto__container">
                     <div className="userImage__container">
                        <Avatar src={profile.avatar} alt="User profile" />
                     </div>
                  </div>
                  <div className="profileTop__container ">
                     <div className="profileButtons__container">
                        {isOwnProfile ? (
                           <div>
                              <OutlineButton
                                 role="link"
                                 path="/profile"
                                 text="Edit Profile"
                              />
                           </div>
                        ) : (
                           <React.Fragment>
                              <Link to={`/messages/${profile._id}`}>
                                 <FiMail />
                              </Link>
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
                           </React.Fragment>
                        )}
                     </div>
                     <div className="userDetailsContainer">
                        <div className="user__name">
                           <span>{profile.name}</span>
                        </div>
                        <div className="screen__name">
                           <span>@{profile.screen_name}</span>
                        </div>
                        {/* Users Bio, location and joined date goes here */}

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
                        tab1={<ProfileTweets userId={profile._id} />}
                        tab2={<ProfileReplies userId={profile._id} />}
                        tab3={<ProfileLikes userId={profile._id} />}
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
})(SelectedProfile);
