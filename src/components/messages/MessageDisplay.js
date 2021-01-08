import React from 'react';
import PropTypes from 'prop-types';
import NoSelection from './NoSelection';
import '../../styles/design/messageDisplay.css';

const MessageDisplay = ({ setModalOpen }) => {
   return (
      <div className="message-display">
         <div className="no-selection-view">
            <NoSelection setModalOpen={setModalOpen} />
         </div>
      </div>
   );
};

MessageDisplay.propTypes = {};

export default MessageDisplay;
