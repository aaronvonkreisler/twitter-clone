import React, { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64, uploadPhotoForTweet } from '../../../../utils/imageService';
import { photoUploadError } from '../../../../actions/tweets';
import { openGifModal } from '../../../../actions/modal';
import ChatFormDisplay from './ChatFormDisplay';

const ChatFormWrapper = ({ photoUploadError, openGifModal }) => {
   const [displayImageButtons, setDisplayImageButtons] = useState(true);
   const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
   const [sendDisabled, setSendDisabled] = useState(true);
   const [textValue, setTextValue] = useState('');
   const [imageBlob, setImageBlob] = useState(null);
   const textInputRef = useRef();
   const emojiPickerRef = useRef();

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;
      if (file !== undefined) {
         if (file.type.match(regex)) {
            getBase64(file).then((data) => setImageBlob(data));
            setDisplayImageButtons(false);
            // setImageFile(file);
         } else {
            handleRemoveImage();
            photoUploadError();
         }
      }
   };

   const handleRemoveImage = () => {
      setImageBlob(null);
      setDisplayImageButtons(true);
   };

   const handleTextChange = (e) => {
      setTextValue(e.target.value);
   };

   const handleSubmit = () => {
      console.log(textValue);
      setTextValue('');
      setImageBlob(null);
   };

   const onEmojiClick = (e, emojiObject) => {
      const { emoji } = emojiObject;
      let currentMessage = textInputRef.current.value;
      currentMessage += emoji;
      setTextValue(currentMessage);
      setSendDisabled(false);
      textInputRef.current.focus();
   };

   const handleEmojiClose = useCallback((e) => {
      if (emojiPickerRef.current.contains(e.target)) {
         return;
      } else {
         setEmojiMenuOpen(false);
         document.removeEventListener('mousedown', handleEmojiClose);
      }
   }, []);

   useEffect(() => {
      if (emojiMenuOpen) {
         document.addEventListener('mousedown', handleEmojiClose);
      }
   }, [emojiMenuOpen, handleEmojiClose]);

   useEffect(() => {
      const disabled = textValue.length === 0;
      setSendDisabled(disabled);
   }, [textValue]);

   return (
      <ChatFormDisplay
         imageBlob={imageBlob}
         displayImageButtons={displayImageButtons}
         textInputRef={textInputRef}
         textValue={textValue}
         handleTextChange={handleTextChange}
         handleSubmit={handleSubmit}
         emojiMenuOpen={emojiMenuOpen}
         setEmojiMenuOpen={setEmojiMenuOpen}
         emojiPickerRef={emojiPickerRef}
         onEmojiClick={onEmojiClick}
         sendDisabled={sendDisabled}
         handleFileChange={handleFileChange}
         handleRemoveImage={handleRemoveImage}
         openGifModal={openGifModal}
      />
   );
};

ChatFormWrapper.propTypes = {
   photoUploadError: PropTypes.func.isRequired,
};

export default connect(null, { photoUploadError, openGifModal })(
   ChatFormWrapper
);
