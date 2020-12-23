import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileLikes } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Tweet from '../tweets/Tweet';

const ProfileLikes = ({
   userId,
   authId,
   getProfileLikes,
   onCommentClick,
   profiles: { likesLoading, likedTweets },
}) => {
   useEffect(() => {
      getProfileLikes(userId);
   }, [getProfileLikes, userId]);
   return (
      <React.Fragment>
         {likesLoading ? (
            <Spinner />
         ) : (
            likedTweets.map((tweet) => (
               <Tweet
                  tweet={tweet}
                  displayActions
                  key={tweet._id}
                  authId={authId}
                  onCommentClick={onCommentClick}
               />
            ))
         )}
      </React.Fragment>
   );
};

ProfileLikes.propTypes = {
   getProfileLikes: PropTypes.func.isRequired,
   userId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
   profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfileLikes })(ProfileLikes);
