import React from 'react';
import Picker from 'emoji-picker-react';
import { FiImage, FiSmile } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { AiOutlineSend, AiOutlineGif } from 'react-icons/ai';
import { Input } from '@material-ui/core';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import '../../../../styles/design/messageDisplay.css';
import '../../../../styles/design/emojiPicker.css';

const ChatFormDisplay = ({
   imageBlob,
   displayImageButtons,
   textValue,
   handleTextChange,
   textInputRef,
   handleSubmit,
   emojiMenuOpen,
   setEmojiMenuOpen,
   emojiPickerRef,
   onEmojiClick,
   sendDisabled,
   handleFileChange,
   handleRemoveImage,
   openGifModal,
}) => {
   const smallDevice = useMediaQuery('(max-width: 500px)');
   return (
      <aside className="chat-form" aria-label="Start a new message">
         {emojiMenuOpen && (
            <div
               className="emoji-wrapper"
               style={smallDevice ? null : { left: '40%' }}
               ref={emojiPickerRef}
            >
               <Picker onEmojiClick={onEmojiClick} />
            </div>
         )}
         <div className="progress-bar"></div>
         <div className="chat-form-row">
            {displayImageButtons && (
               <div className="picture-buttons">
                  <input
                     accept="image/*"
                     className="image-input"
                     id="image-upload"
                     type="file"
                     onChange={handleFileChange}
                  />
                  <label htmlFor="image-upload" className="icon-button">
                     <span aria-label="upload picture">
                        <FiImage />
                     </span>
                  </label>
                  <button
                     className="icon-button gif"
                     onClick={() => openGifModal()}
                  >
                     <AiOutlineGif />
                  </button>
               </div>
            )}

            <div className="input-field">
               {imageBlob !== null && (
                  <div className="image-container">
                     <div className="image-body">
                        <div className="image__wrapper">
                           <div
                              style={{
                                 backgroundImage: `url(${imageBlob})`,
                              }}
                              className="presentation"
                           />
                           <img src={imageBlob} alt="" className="media" />
                        </div>
                     </div>
                     <div className="close-button" onClick={handleRemoveImage}>
                        <CgClose />
                     </div>
                  </div>
               )}

               <div className="message-wrapper">
                  <div className="message-area">
                     <Input
                        multiline
                        disableUnderline
                        fullWidth
                        rowsMax={5}
                        className="input"
                        value={textValue}
                        onChange={handleTextChange}
                        inputRef={textInputRef}
                     />
                  </div>
                  <div className="emoji-area">
                     <button
                        className="icon-button emoji"
                        onClick={() => setEmojiMenuOpen(!emojiMenuOpen)}
                     >
                        <FiSmile />
                     </button>
                  </div>
               </div>
            </div>
            <div className="send">
               <div className="icon">
                  <button
                     className="icon-button"
                     onClick={handleSubmit}
                     disabled={sendDisabled}
                  >
                     <AiOutlineSend />
                  </button>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default ChatFormDisplay;
