import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgMore } from 'react-icons/cg';
import Header from '../layout/Header';
import NoBookmarks from '../bookmarks/NoBookmarks';
import Spinner from '../layout/Spinner';
import Tweet from '../tweets/Tweet';

import { getUserBookmarks, clearBookmarkState } from '../../actions/bookmarks';

const Bookmarks = ({
   bookmarks: { bookmarks, loading },
   auth: {user},
   getUserBookmarks,
   clearBookmarkState,
}) => {
   useEffect(() => {
      getUserBookmarks();

      
   }, [getUserBookmarks]);

   return (
      <div>
         <Header
            borderBottom
            text="Bookmarks"
            rightIcon
            IconComponent={CgMore}
            onRightIconClick={() => alert('Menu Goes here')}
         />
         <div className="feed">
            {loading && <Spinner />}
            {!loading && user !== null && bookmarks.tweets.length > 0 ? (
               bookmarks.tweets.map((tweet) => (
                  <Tweet
                     tweet={tweet}
                     key={tweet._id}
                     displayNumbers
                     displayActions
                     authId={user._id}
                  />
               ))
            ) : (
               <NoBookmarks />
            )}
         </div>
      </div>
   );
};

Bookmarks.propTypes = {
   getUserBookmarks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   bookmarks: state.bookmarks,
   auth: state.auth
});

export default connect(mapStateToProps, {
   getUserBookmarks,
   clearBookmarkState,
})(Bookmarks);
