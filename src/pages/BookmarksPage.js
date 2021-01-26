import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgMore } from 'react-icons/cg';
import Header from '../components/layout/Header';
import EmptyDisplay from '../components/layout/EmptyDisplay';
import Spinner from '../components/layout/Spinner';
import Tweet from '../components/tweets/Tweet';
import BookmarksMenu from '../components/bookmarks/BoomarksMenu';

import { getUserBookmarks, clearBookmarkState } from '../actions/bookmarks';

const BookmarksPage = ({
   bookmarks: { bookmarks, loading },
   auth: { user },
   getUserBookmarks,
   clearBookmarkState,
}) => {
   const [anchorEl, setAnchorEl] = useState(null);

   const openMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };
   useEffect(() => {
      document.title = 'Bookmarks/Tweeter';
      getUserBookmarks();
   }, [getUserBookmarks]);

   return (
      <div>
         <Header
            borderBottom
            text="Bookmarks"
            rightIcon
            IconComponent={CgMore}
            onRightIconClick={openMenu}
         />
         <BookmarksMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onClose={handleClose}
         />
         <div className="feed">
            {!loading && user !== null ? (
               bookmarks.tweets?.length > 0 ? (
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
                  <EmptyDisplay
                     primaryText="You haven’t added any Tweets to your Bookmarks yet"
                     secondaryText="When you do, they’ll show up here."
                  />
               )
            ) : (
               <Spinner />
            )}
         </div>
      </div>
   );
};

BookmarksPage.propTypes = {
   getUserBookmarks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   bookmarks: state.bookmarks,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getUserBookmarks,
   clearBookmarkState,
})(BookmarksPage);
