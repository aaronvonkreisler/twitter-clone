import React from 'react';
import Picker from 'emoji-picker-react';

import { FiImage } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { FiSmile } from 'react-icons/fi';
import {
   Avatar,
   Button,
   CircularProgress,
   Input,
   IconButton,
} from '@material-ui/core';
import MentionMenu from '../layout/MentionMenu';
import '../../styles/design/tweetForm.css';
import '../../styles/design/emojiPicker.css';

const TweetForm = ({
   user,
   loading,
   tweet,
   setTweet,
   tweetInputRef,
   handleInputChange,
   result,
   setResult,
   fetching,
   mention,
   imagePreview,
   handleRemoveImage,
   handleFileChange,
   emojiMenuOpen,
   setEmojiMenuOpen,
   tweetLength,
   normalizeLength,
   onEmojiClick,
   disabled,
   handleTweetSubmit,
   bottomBorder,
   emojiPickerRef,
   withEmojiMenuAbove,
   withMultipleRows,
}) => {
   const spinnerColors = {
      blue: 'rgb(29, 161, 242, 1)',
      red: 'rgb(224, 36, 94)',
   };

   return (
      <div className="tweetForm">
         <div className="tweetForm__wrapper">
            {/*Avatar */}
            <div className="avatar__wrapper">
               {!loading && user !== null ? (
                  <Avatar
                     src={user.avatarSmall}
                     style={{ height: '49px', width: '49px' }}
                  />
               ) : (
                  <Avatar style={{ height: '49px', width: '49px' }} />
               )}
            </div>
            {/*Everything else */}
            <div className="rightSide__wrapper">
               <form>
                  <div className="textEditor__root">
                     <div className="textEditor">
                        <Input
                           multiline
                           disableUnderline
                           value={tweet.content}
                           onChange={handleInputChange}
                           placeholder="What's happening?"
                           className="tweet-form-textarea"
                           inputRef={tweetInputRef}
                           rows={withMultipleRows ? 5 : null}
                        />
                        {result && (
                           <MentionMenu
                              users={result}
                              open={mention}
                              fetching={fetching}
                              username={mention}
                              onClick={(user) => {
                                 let currentTweetValue =
                                    tweetInputRef.current.value;

                                 const updatedValue = currentTweetValue.replace(
                                    /@\b(\w+)$/,
                                    `@${user.screen_name}`
                                 );
                                 setTweet({
                                    ...tweet,
                                    content: updatedValue,
                                 });

                                 tweetInputRef.current.focus();

                                 setResult(null);
                              }}
                           />
                        )}
                     </div>
                  </div>
                  {imagePreview !== null && (
                     <div className="image__container">
                        <div className="image__wrapper">
                           <div
                              style={{
                                 backgroundImage: `url(${imagePreview})`,
                              }}
                              className="presentation"
                           />
                           <img src={imagePreview} alt="" className="image" />
                        </div>
                        <div
                           className="image__button"
                           onClick={handleRemoveImage}
                        >
                           <CgClose />
                        </div>
                     </div>
                  )}
                  <div className="bottom-wrapper">
                     <div className="toolbar__root">
                        <div className="toolbar__addOns">
                           <div className="imageUpload">
                              <input
                                 type="file"
                                 accept="image/*"
                                 id="imageUpload"
                                 style={{ display: 'none' }}
                                 onChange={handleFileChange}
                              />
                              <label htmlFor="imageUpload">
                                 <IconButton
                                    aria-label="upload picture"
                                    component="span"
                                    className="uploadButton"
                                 >
                                    <FiImage />
                                 </IconButton>
                              </label>
                           </div>
                           <div className="imageUpload">
                              <IconButton
                                 aria-label="Open emoji menu"
                                 component="span"
                                 className="uploadButton"
                                 onClick={() =>
                                    setEmojiMenuOpen(!emojiMenuOpen)
                                 }
                              >
                                 <FiSmile />
                              </IconButton>
                           </div>
                        </div>
                        <div className="toolbar__submit">
                           <div className="counter">
                              <CircularProgress
                                 value={normalizeLength(tweetLength)}
                                 variant="static"
                                 size={tweetLength > 280 ? 30 : 20}
                                 thickness={2.2}
                                 style={
                                    tweetLength > 280
                                       ? { color: spinnerColors.red }
                                       : { color: spinnerColors.blue }
                                 }
                              />
                           </div>
                           <Button
                              className="tweetForm__button"
                              onClick={handleTweetSubmit}
                              disabled={disabled}
                           >
                              Tweet
                           </Button>
                        </div>
                        {emojiMenuOpen && (
                           <div
                              className="emoji-wrapper"
                              ref={emojiPickerRef}
                              style={
                                 withEmojiMenuAbove
                                    ? { bottom: '101%' }
                                    : { top: '101%' }
                              }
                           >
                              <Picker onEmojiClick={onEmojiClick} />
                           </div>
                        )}
                     </div>
                  </div>
               </form>
            </div>
         </div>
         {bottomBorder && <div className="tweetForm__bottom-border" />}
      </div>
   );
};

TweetForm.propTypes = {};

export default TweetForm;
