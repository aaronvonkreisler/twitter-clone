import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import UserPreview from '../layout/UserPreview';
import PropTypes from 'prop-types';
import '../../styles/design/cards.css';

const SuggestedFollowCard = ({ suggestions: { loading, sidebarUsers } }) => {
   return (
      <section className="card">
         <header className="card-header">
            <h2 className="title">Who to follow</h2>
         </header>
         {loading && (
            <div className="skeleton-loader">
               <Spinner />
            </div>
         )}
         {!loading &&
            sidebarUsers.length > 0 &&
            sidebarUsers.map((user) => (
               <UserPreview user={user} showBio={false} key={user._id} />
            ))}
         <Link className="card-more" to="/connect">
            Show more
         </Link>
      </section>
   );
};

SuggestedFollowCard.propTypes = {};

const mapStateToProps = (state) => ({
   suggestions: state.suggestions,
});

export default connect(mapStateToProps)(SuggestedFollowCard);
