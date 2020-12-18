import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getProfileTweets } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Tweet from '../tweets/Tweet';

import PropTypes from 'prop-types';

const ProfileTweets = ({
   getProfileTweets,
   userId,
   profiles: { tweetsLoading, tweets },
}) => {
   useEffect(() => {
      getProfileTweets(userId);
   }, [getProfileTweets, userId]);

   return (
      <React.Fragment>
         {tweetsLoading ? (
            <Spinner />
         ) : (
            tweets.map((tweet) => (
               <Tweet tweet={tweet} key={tweet._id} displayActions={false} />
            ))
         )}
      </React.Fragment>
   );
};

ProfileTweets.propTypes = {
   getProfileTweets: PropTypes.func.isRequired,
   tweets: PropTypes.array,
};

const mapStateToProps = (state) => ({
   profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfileTweets })(ProfileTweets);
