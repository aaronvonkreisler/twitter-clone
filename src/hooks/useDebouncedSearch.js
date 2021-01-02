import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import { searchUsers } from '../services/user';

const useDebouncedSearch = () => {
   const [result, setResult] = useState([]);
   const [fetching, setFetching] = useState(false);

   const handleSearch = async (string, offset) => {
      if (!string) {
         setFetching(false);
         return setResult([]);
      }

      try {
         const response = await searchUsers(string, offset);
         setResult(response ? response : []);
         setFetching(false);
      } catch (err) {
         setFetching(false);
         throw new Error(err);
      }
   };
   const handleSearchDebounced = debounce(handleSearch, 500);
   const handleSearchDebouncedRef = useRef((string, offset) =>
      handleSearchDebounced(string, offset)
   ).current;
   return {
      handleSearchDebouncedRef,
      result,
      setResult,
      fetching,
      setFetching,
   };
};

export default useDebouncedSearch;
