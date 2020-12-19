import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import '../../styles/design/button.css';

const OutlineButton = ({ text, onClick, role, path }) => {
   return (
      <React.Fragment>
         {role === 'button' && (
            <Button className="tweet-button-outline" onClick={onClick}>
               {text}
            </Button>
         )}
         {role === 'link' && (
            <Button
               className="tweet-button-outline"
               component={RouterLink}
               to={path}
            >
               {text}
            </Button>
         )}
      </React.Fragment>
   );
};

OutlineButton.propTypes = {
   onClick: PropTypes.func,
   role: PropTypes.string,
   path: PropTypes.string,
   text: PropTypes.string,
};

OutlineButton.defaultProps = {
   role: 'button',
};

export default OutlineButton;
