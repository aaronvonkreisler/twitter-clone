import React, {
   useState,
   useRef,
   useCallback,
   useEffect,
   Fragment,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64, uploadPhotoForTweet } from '../../../../utils/imageService';
import { photoUploadError } from '../../../../actions/tweets';
import { openGifModal, closeGifModal } from '../../../../actions/modal';
import { sendDirectMessage } from '../../../../actions/messages';
import ChatFormDisplay from './ChatFormDisplay';
import GifModal from '../../../forms/GifModal';

const ChatFormWrapper = ({
   photoUploadError,
   sendDirectMessage,
   openGifModal,
   closeGifModal,
   chatId,
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
      const gifURL = gif.images.downsized_medium.url;
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
      sendDirectMessage(message);
      setMessage({
         content: '',
         image: null,
         chatId,
      });
      setImageBlob(null);
      setDisplayImageButtons(true);
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

   useEffect(() => {
      async function uploadImageToDb() {
         if (fileToUpload !== null) {
            const imagePath = await uploadPhotoForTweet(fileToUpload);
            setMessage({ ...message, image: imagePath });
            setFileToUpload(null);
         }
      }
      uploadImageToDb();
   }, [fileToUpload, message]);

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
         />
      </Fragment>
   );
};

ChatFormWrapper.propTypes = {
   photoUploadError: PropTypes.func.isRequired,
};

export default connect(null, {
   photoUploadError,
   openGifModal,
   closeGifModal,
   sendDirectMessage,
})(ChatFormWrapper);
