import React from 'react';
import { FiSearch } from 'react-icons/fi';

import '../../styles/design/searchbar.css';

const Searchbar = ({ value, onChange, ...props }) => {
   return (
      <div className="search-bar">
         <label className="search-box">
            <span className="icon">
               <FiSearch />
            </span>
            <input
               type="text"
               placeholder="Search Tweeter"
               value={value}
               onChange={onChange}
               {...props}
            />
         </label>
      </div>
   );
};

export default Searchbar;
