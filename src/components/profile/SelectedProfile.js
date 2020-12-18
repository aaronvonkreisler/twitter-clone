import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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

import '../../styles/design/profile.css';
import '../../styles/design/utils.css';

const SelectedProfile = ({
   getUserByUsername,
   clearProfileState,
   unfollowUser,
   followUser,
   match,
   profiles: { profile, loading, isFollowing, isOwnProfile },
   auth,
}) => {
   let history = useHistory();
   const [isHovering, setIsHovering] = useState(false);

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
               <Header
                  leftIcon
                  onIconClick={() => history.goBack()}
                  text={profile.name}
               />
               <div className="profileWrapper ">
                  <div className="coverPhoto__container">
                     <div className="userImage__container">
                        <Avatar src={profile.avatar} alt="User profile" />
                     </div>
                  </div>
                  <div className="profileTop__container ">
                     <div className="profileButtons__container">
                        {!isOwnProfile && (
                           <React.Fragment>
                              <Link to={`/messages/${profile._id}`}>
                                 <FiMail />
                              </Link>
                              <div className="follow__button">
                                 {isFollowing ? (
                                    <Button
                                       className="follow-button"
                                       fullWidth
                                       onMouseEnter={() => setIsHovering(true)}
                                       onMouseLeave={() => setIsHovering(false)}
                                       onClick={() => unfollowUser(profile._id)}
                                    >
                                       {isHovering ? 'Unfollow' : 'Following'}
                                    </Button>
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
                           <div className="item">
                              <span className="number">
                                 {profile.following.length}
                              </span>
                              <span className="text">Following</span>
                           </div>
                           <div className="item">
                              <span className="number">
                                 {profile.followers.length}
                              </span>
                              <span className="text">Followers</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="profile__tabs feed">
                     <ProfileTabs
                        tweets={<ProfileTweets userId={profile._id} />}
                        replies={<ProfileReplies userId={profile._id} />}
                        likes={<ProfileLikes userId={profile._id} />}
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
