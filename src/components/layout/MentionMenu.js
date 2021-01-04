import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import SmallUserPreview from './SmallUserPreview';
import '../../styles/design/mentionMenu.css';

const MentionMenu = ({ users, fetching }) => {
   return (
      <div className="mention-menu" role="listbox">
         {fetching && <Spinner />}
         {!fetching &&
            users.length > 0 &&
            users.map((user) => (
               <SmallUserPreview user={user} key={user._id} />
            ))}
      </div>
   );
};

MentionMenu.propTypes = {
   users: PropTypes.array,
};

export default MentionMenu;
