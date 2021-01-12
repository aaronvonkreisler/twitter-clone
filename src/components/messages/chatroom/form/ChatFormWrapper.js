import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatFormDisplay from './ChatFormDisplay';
const ChatFormWrapper = (props) => {
   const [showImage, setShowImage] = useState(false);
   const [displayImageButtons, setDisplayImageButtons] = useState(true);
   const [textValue, setTextValue] = useState('');
   const textInputRef = useRef();

   const handleTextChange = (e) => {
      setTextValue(e.target.value);
   };

   const handleSubmit = () => {
      console.log(textValue);
      setTextValue('');
   };

   return (
      <ChatFormDisplay
         showImage={showImage}
         displayImageButtons={displayImageButtons}
         textInputRef={textInputRef}
         textValue={textValue}
         handleTextChange={handleTextChange}
         handleSubmit={handleSubmit}
      />
   );
};

ChatFormWrapper.propTypes = {};

export default ChatFormWrapper;
