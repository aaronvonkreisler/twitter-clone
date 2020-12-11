import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTweet } from '../../actions/tweets';
import Spinner from '../layout/Spinner';
import Header from '../layout/Header';
import PropTypes from 'prop-types';
import Tweet from '../single-tweet/Tweet';

const TweetDisplay = ({ tweets: { tweet, loading }, getTweet, match }) => {
   let history = useHistory();

   useEffect(() => {
      getTweet(match.params.tweet_id);
   }, [getTweet, match.params.tweet_id]);
   return (
      <React.Fragment>
         <Header text="Tweet" leftIcon onIconClick={() => history.goBack()} />
         <div className="feed">
            {loading || tweet === null ? <Spinner /> : <Tweet tweet={tweet} />}
         </div>
      </React.Fragment>
   );
};

TweetDisplay.propTypes = {
   getTweet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
});

export default connect(mapStateToProps, { getTweet })(TweetDisplay);
