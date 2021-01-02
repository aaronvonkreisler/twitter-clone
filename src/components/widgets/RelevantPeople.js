import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import UserPreview from '../layout/UserPreview';

import '../../styles/design/cards.css';

const RelevantPeople = ({ tweets: { tweet, loading } }) => {
   return (
      <section className="transparent-card">
         <header className="card-header">
            <h2 className="title">Relevant People</h2>
         </header>
         {!loading && tweet !== null && (
            <UserPreview user={tweet.user} showBio bottomBorder={false} />
         )}
         <div className="footer" />
      </section>
   );
};

RelevantPeople.propTypes = {
   tweet: PropTypes.object,
   loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   tweets: state.tweets,
});

export default connect(mapStateToProps)(RelevantPeople);
