import React from 'react';
import '../../styles/design/noBookmarks.css';

const NoBookmarks = () => {
   return (
      <div className="noBookmarks">
         <div className="noBookmarks__wrapper">
            <div className="mainText">
               <span>You haven't added any Tweets to your Bookmarks yet</span>
            </div>
            <div className="secondaryText">
               <span>When you do, they'll show up here.</span>
            </div>
         </div>
      </div>
   );
};

export default NoBookmarks;
