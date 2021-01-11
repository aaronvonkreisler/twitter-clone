import React from 'react';
import PropTypes from 'prop-types';
import SmallUserPreview from '../layout/SmallUserPreview';
import Spinner from '../layout/Spinner';
import '../../styles/design/searchResultsMenu.css';

const SearchResultsMenu = ({ users, open, fetching, onClick, username }) => {
   return (
      <React.Fragment>
         {open && (
            <div role="listbox" className="search-menu">
               {fetching && <Spinner />}
               {!fetching &&
                  users.map((user) => (
                     <SmallUserPreview
                        user={user}
                        key={user._id}
                        bottomBorder
                        onClick={onClick}
                     />
                  ))}
               {!fetching && users.length === 0 && (
                  <div className="no-results">
                     <span>No results found</span>
                  </div>
               )}
            </div>
         )}
      </React.Fragment>
   );
};

SearchResultsMenu.propTypes = {
   users: PropTypes.array,
};

export default SearchResultsMenu;
