import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileReplies } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Tweet from '../tweets/Tweet';

const ProfileReplies = ({
   userId,
   getProfileReplies,
   profiles: { repliesLoading, replies, pinnedTweet },
}) => {
   useEffect(() => {
      getProfileReplies(userId);
   }, [getProfileReplies, userId]);
   return (
      <React.Fragment>
         {repliesLoading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               {pinnedTweet && (
                  <Tweet
                     tweet={pinnedTweet}
                     key={pinnedTweet.user._id}
                     displayActions={false}
                     pinnedTweet
                  />
               )}
               {replies.map((reply) => (
                  <Tweet tweet={reply} displayActions={false} key={reply._id} />
               ))}
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

ProfileReplies.propTypes = {
   getProfileReplies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfileReplies })(ProfileReplies);
