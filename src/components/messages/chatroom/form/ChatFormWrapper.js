import React, {
   useState,
   useRef,
   useCallback,
   useEffect,
   Fragment,
   useReducer,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64, validateImage } from '../../../../utils/imageService';
import { photoUploadError } from '../../../../actions/tweets';
import { openGifModal, closeGifModal } from '../../../../actions/modal';
import {
   sendDirectMessage,
   sendDirectMessageWithImage,
} from '../../../../actions/messages';
import ChatFormDisplay from './ChatFormDisplay';
import GifModal from '../../../forms/GifModal';
import {
   chatFormReducer,
   UPDATE_TEXT,
   UPLOAD_FILE,
   ADD_GIF,
   ADD_EMOJI,
   REMOVE_IMAGE,
   RESET_STATE,
   CLOSE_EMOJI_MENU,
   TOGGLE_EMOJI_MENU,
   DISABLE_SEND,
} from './chatFormReducer';

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
   const initialState = {
      displayImageButtons: true,
      emojiMenuOpen: false,
      sendDisabled: true,
      fileToUpload: null,
      imageBlob: null,
      message: {
         content: '',
         image: null,
      },
      chatId,
   };

   const [state, dispatch] = useReducer(chatFormReducer, initialState);

   const textInputRef = useRef();
   const emojiPickerRef = useRef();

   console.log(state);

   const handleFileChange = async (e) => {
      const file = e.target.files[0];
      const imageData = await validateImage(file, () => {
         handleRemoveImage();
         photoUploadError();
      });

      if (imageData !== undefined) {
         dispatch({
            type: UPLOAD_FILE,
            payload: { blob: imageData, file: file },
         });
      }
   };

   const handleGifClick = (gif) => {
      const gifURL = gif.images.fixed_height.webp;
      dispatch({
         type: ADD_GIF,
         payload: gifURL,
      });
      closeGifModal();
   };

   const handleRemoveImage = () => {
      dispatch({ type: REMOVE_IMAGE });
   };

   const handleTextChange = (e) => {
      dispatch({ type: UPDATE_TEXT, payload: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      endTypingIndicatorOnSend();

      const { message, chatId } = state;

      const messageObject = {
         content: message.content,
         image: message.image,
         chatId: chatId,
      };
      if (state.fileToUpload !== null) {
         const formData = new FormData();
         formData.append('image', state.fileToUpload);
         formData.set('content', state.message.content);
         formData.set('chatId', state.chatId);

         sendDirectMessageWithImage(formData, selectedChat);
         dispatch({ type: RESET_STATE });
      } else {
         sendDirectMessage(messageObject, selectedChat);
         dispatch({ type: RESET_STATE });
      }
   };

   const toggleEmojiMenu = () => {
      dispatch({ type: TOGGLE_EMOJI_MENU });
   };

   const onEmojiClick = (e, emojiObject) => {
      const { emoji } = emojiObject;
      let currentMessage = textInputRef.current.value;
      currentMessage += emoji;

      dispatch({ type: ADD_EMOJI, payload: currentMessage });
      textInputRef.current.focus();
   };

   const handleEmojiClose = useCallback((e) => {
      if (emojiPickerRef.current.contains(e.target)) {
         return;
      } else {
         dispatch({ type: CLOSE_EMOJI_MENU });
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
      if (state.emojiMenuOpen) {
         document.addEventListener('mousedown', handleEmojiClose);
      }
   }, [state.emojiMenuOpen, handleEmojiClose]);

   useEffect(() => {
      const { message, imageBlob } = state;
      const noContent = message.content.length === 0 && imageBlob === null;
      const emptyMessage = message.content.trim() === '' && imageBlob === null;

      const shouldDisable = noContent || emptyMessage;

      dispatch({
         type: DISABLE_SEND,
         payload: shouldDisable,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.message, state.imageBlob]);

   return (
      <Fragment>
         <GifModal handleGifClick={handleGifClick} />
         <ChatFormDisplay
            imageBlob={state.imageBlob}
            displayImageButtons={state.displayImageButtons}
            textInputRef={textInputRef}
            textValue={state.message.content}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            emojiMenuOpen={state.emojiMenuOpen}
            toggleEmojiMenu={toggleEmojiMenu}
            emojiPickerRef={emojiPickerRef}
            onEmojiClick={onEmojiClick}
            sendDisabled={state.sendDisabled}
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
