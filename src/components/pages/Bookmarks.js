import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgMore } from 'react-icons/cg';
import Header from '../layout/Header';
import NoBookmarks from '../bookmarks/NoBookmarks';
import Spinner from '../layout/Spinner';

import { getUserBookmarks, clearBookmarkState } from '../../actions/bookmarks';

const Bookmarks = ({
   bookmarks: { bookmarks, loading },
   getUserBookmarks,
   clearBookmarkState,
}) => {
   useEffect(() => {
      getUserBookmarks();

      return function cleanup() {
         clearBookmarkState();
      };
   }, [getUserBookmarks, clearBookmarkState]);

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
            <NoBookmarks />
         </div>
      </div>
   );
};

Bookmarks.propTypes = {
   getUserBookmarks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   bookmarks: state.bookmarks,
});

export default connect(mapStateToProps, {
   getUserBookmarks,
   clearBookmarkState,
})(Bookmarks);
