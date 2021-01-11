import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Searchbar from '../layout/Searchbar';
import SearchResultsMenu from './SearchResultsMenu';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import '../../styles/design/searchResultsMenu.css';

const SearchUsers = ({ setResult }) => {
   const [query, setQuery] = useState('');
   const [open, setOpen] = useState(false);
   let history = useHistory();

   const handleClose = useCallback(() => {
      setOpen(false);
      setQuery('');
      document.removeEventListener('click', handleClose);
   }, []);

   const {
      handleSearchDebouncedRef,
      result,
      fetching,
      setFetching,
   } = useDebouncedSearch();

   useEffect(() => {
      if (result.length > 0 && setResult) {
         setResult(result);
      }
   }, [result, setResult]);

   useEffect(() => {
      if (query.length > 0) {
         setOpen(true);
         document.addEventListener('click', handleClose);
      }
   }, [query, handleClose]);

   const handleUserClick = (user) => {
      history.push(`/profile/${user.screen_name}`);
   };

   return (
      <React.Fragment>
         <div className="searchbar-wrapper">
            <Searchbar
               value={query}
               onChange={(e) => {
                  handleSearchDebouncedRef(e.target.value);
                  setQuery(e.target.value);
                  e.target.value && setFetching(true);
               }}
               placeholder="Search Tweeter"
            />
         </div>

         <div className="menu-container">
            <SearchResultsMenu
               users={result}
               open={open}
               fetching={fetching}
               onClick={handleUserClick}
            />
         </div>
      </React.Fragment>
   );
};

SearchUsers.propTypes = {};

export default SearchUsers;
