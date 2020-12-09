import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTimelineTweets } from '../../actions/tweets';
import PropTypes from 'prop-types';

import './styles/Feed.css';

const Feed = ({ getTimelineTweets, tweets: { tweets, loading } }) => {
   useEffect(() => {
      getTimelineTweets();
   }, [getTimelineTweets]);
   return (
      <div className="feed">
         {loading ? (
            <React.Fragment>Loading...</React.Fragment>
         ) : (
            <React.Fragment>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
               <p> This is the feed screen yay ya ya ya yayaya ayy aya </p>
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
});
export default connect(mapStateToProps, { getTimelineTweets })(Feed);
