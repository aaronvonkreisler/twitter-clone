import React from 'react';
import '../../../styles/design/noSelection.css';

const NoSelection = ({ setModalOpen }) => {
   return (
      <div className="no-selection">
         <div className="primary-text">
            <span>You don't have a message selected</span>
         </div>
         <div className="secondary-text">
            <span>
               Choose one from your existing messages, or start a new one.
            </span>
         </div>
         <div className="action">
            <button
               className="message-button"
               onClick={() => setModalOpen(true)}
            >
               <span className="button-text">New message</span>
            </button>
         </div>
      </div>
   );
};

export default NoSelection;
