import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design/emptyDisplay.css';

const EmptyDisplay = ({ primaryText, secondaryText }) => {
  return (
    <div className="emptyDisplay">
      <div className="emptyDisplay__wrapper">
        <div className="mainText">
          <span>{primaryText}</span>
        </div>
        <div className="secondaryText">
          <span>{secondaryText}</span>
        </div>
      </div>
    </div>
  );
};

EmptyDisplay.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

export default EmptyDisplay;
