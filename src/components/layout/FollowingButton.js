import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import '../../styles/design/button.css';

const FollowingButton = ({ onClick }) => {
   const [isHovering, setIsHovering] = useState(false);
   return (
      <div>
         <Button
            className="follow-button"
            fullWidth
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onClick}
         >
            {isHovering ? 'Unfollow' : 'Following'}
         </Button>
      </div>
   );
};

FollowingButton.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default FollowingButton;
