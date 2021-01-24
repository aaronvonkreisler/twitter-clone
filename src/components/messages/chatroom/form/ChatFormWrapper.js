import React, {
   useState,
   useRef,
   useCallback,
   useEffect,
   Fragment,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64 } from '../../../../utils/imageService';
import { photoUploadError } from '../../../../actions/tweets';
import { openGifModal, closeGifModal } from '../../../../actions/modal';
import {
   sendDirectMessage,
   sendDirectMessageWithImage,
} from '../../../../actions/messages';
import ChatFormDisplay from './ChatFormDisplay';
import GifModal from '../../../forms/GifModal';

const ChatFormWrapper = ({
   photoUploadError,
   sendDirectMessage,
   sendDirectMessageWithImage,
   openGifModal,
   closeGifModal,
   chatId,
   updateTypingIndicator,
   endTypingIndicatorOnSend,
   chats: { sendingMessage, selectedChat },
}) => {
   const [displayImageButtons, setDisplayImageButtons] = useState(true);
   const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
   const [sendDisabled, setSendDisabled] = useState(true);
   const [fileToUpload, setFileToUpload] = useState(null);
   const [message, setMessage] = useState({
      content: '',
      image: null,
      chatId,
   });
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
            setFileToUpload(file);
         } else {
            handleRemoveImage();
            photoUploadError();
         }
      }
   };
   const handleGifClick = (gif) => {
      const gifURL = gif.images.fixed_height.webp;
      setImageBlob(gifURL);
      setMessage({
         ...message,
         image: gifURL,
      });
      if (displayImageButtons) {
         setDisplayImageButtons(false);
      }
      closeGifModal();
   };
   const handleRemoveImage = () => {
      setMessage({
         ...message,
         image: null,
      });
      setImageBlob(null);
      setFileToUpload(null);
      setDisplayImageButtons(true);
   };

   const handleTextChange = (e) => {
      setMessage({ ...message, content: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      endTypingIndicatorOnSend();
      if (fileToUpload !== null) {
         const formData = new FormData();
         formData.append('image', fileToUpload);
         formData.set('content', message.content);
         formData.set('chatId', message.chatId);

         // Send message to route that handles files
         sendDirectMessageWithImage(formData, selectedChat);

         setMessage({
            content: '',
            image: null,
            chatId,
         });
         setImageBlob(null);
         setFileToUpload(null);
         setDisplayImageButtons(true);
      } else {
         sendDirectMessage(message, selectedChat);

         setMessage({
            content: '',
            image: null,
            chatId,
         });
         setImageBlob(null);
         setDisplayImageButtons(true);
      }
   };

   const onEmojiClick = (e, emojiObject) => {
      const { emoji } = emojiObject;
      let currentMessage = textInputRef.current.value;
      currentMessage += emoji;
      setMessage({ ...message, content: currentMessage });
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

   // Listen for typing to notify other user
   const handleKeyPress = useCallback(
      (e) => {
         updateTypingIndicator();
      },
      [updateTypingIndicator]
   );

   useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);

      return () => {
         document.removeEventListener('keydown', handleKeyPress);
      };
   }, [handleKeyPress]);

   useEffect(() => {
      if (emojiMenuOpen) {
         document.addEventListener('mousedown', handleEmojiClose);
      }
   }, [emojiMenuOpen, handleEmojiClose]);

   useEffect(() => {
      const noContent = message.content.length === 0 && imageBlob === null;
      const emptyMessage = message.content.trim() === '' && imageBlob === null;

      const shouldDisable = noContent || emptyMessage;
      setSendDisabled(shouldDisable);
   }, [message, imageBlob]);

   return (
      <Fragment>
         <GifModal handleGifClick={handleGifClick} />
         <ChatFormDisplay
            imageBlob={imageBlob}
            displayImageButtons={displayImageButtons}
            textInputRef={textInputRef}
            textValue={message.content}
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
            handleGifClick={handleGifClick}
            sendingMessage={sendingMessage}
         />
      </Fragment>
   );
};

ChatFormWrapper.propTypes = {
   photoUploadError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   chats: state.chats,
});

export default connect(mapStateToProps, {
   photoUploadError,
   openGifModal,
   closeGifModal,
   sendDirectMessage,
   sendDirectMessageWithImage,
})(ChatFormWrapper);
