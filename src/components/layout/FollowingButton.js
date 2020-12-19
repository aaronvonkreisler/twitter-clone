import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import '../../styles/design/button.css';

const FollowingButton = ({ onClick, height30 }) => {
   const [isHovering, setIsHovering] = useState(false);
   return (
      <React.Fragment>
         <Button
            className="follow-button"
            fullWidth
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onClick}
         >
            {isHovering ? 'Unfollow' : 'Following'}
         </Button>
      </React.Fragment>
   );
};

FollowingButton.propTypes = {
   onClick: PropTypes.func.isRequired,
   height30: PropTypes.bool,
};

export default FollowingButton;
