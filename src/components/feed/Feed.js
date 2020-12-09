import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimelineTweets } from '../../actions/tweets';
import NoTweets from './NoTweets';
import './styles/Feed.css';

const Feed = ({ getTimelineTweets, tweets: { tweets, loading }, user }) => {
   useEffect(() => {
      getTimelineTweets();
   }, [getTimelineTweets]);
   return (
      <div className="feed">
         {loading ? (
            <React.Fragment>Loading...</React.Fragment>
         ) : (
            <React.Fragment>
               {user !== null && user.following.length === 0 ? (
                  <NoTweets />
               ) : (
                  <React.Fragment>
                     <p> This is the feed screen yay ya ya ya yayaya ayy aya</p>
                     <p> This is the feed screen yay ya ya ya yayaya ayy aya</p>
                  </React.Fragment>
               )}
            </React.Fragment>
         )}
      </div>
   );
};

Feed.propTypes = {
   getTimelineTweets: PropTypes.func.isRequired,
   tweets: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
   user: state.auth.user,
});
export default connect(mapStateToProps, { getTimelineTweets })(Feed);
