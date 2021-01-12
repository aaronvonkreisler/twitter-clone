import React from 'react';
import { FiImage, FiSmile } from 'react-icons/fi';
import { AiOutlineSend, AiOutlineGif } from 'react-icons/ai';
import { Input } from '@material-ui/core';
import '../../../../styles/design/messageDisplay.css';
const ChatFormDisplay = ({
   showImage,
   displayImageButtons,
   textValue,
   handleTextChange,
   textInputRef,
   handleSubmit,
}) => {
   return (
      <aside className="chat-form" aria-label="Start a new message">
         <div className="progress-bar"></div>
         <div className="chat-form-row">
            {displayImageButtons && (
               <div className="picture-buttons">
                  <input
                     accept="image/*"
                     className="image-input"
                     id="image-upload"
                     type="file"
                  />
                  <label htmlFor="image-upload" className="icon-button">
                     <span aria-label="upload picture">
                        <FiImage />
                     </span>
                  </label>
                  <button
                     className="icon-button gif"
                     onClick={() => alert('Gif')}
                  >
                     <AiOutlineGif />
                  </button>
               </div>
            )}

            <div className="input-field">
               {showImage && <div className="image-container"></div>}

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
                     <button className="icon-button emoji">
                        <FiSmile />
                     </button>
                  </div>
               </div>
            </div>
            <div className="send">
               <div className="icon">
                  <button className="icon-button" onClick={handleSubmit}>
                     <AiOutlineSend />
                  </button>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default ChatFormDisplay;
