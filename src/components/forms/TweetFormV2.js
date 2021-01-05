import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
   Avatar,
   Button,
   CircularProgress,
   Input,
   IconButton,
} from '@material-ui/core';

import { FiImage } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { getBase64, uploadPhotoForTweet } from '../../utils/imageService';
import { photoUploadError } from '../../actions/tweets';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import MentionMenu from '../layout/MentionMenu';

import PropTypes from 'prop-types';
import '../../styles/design/tweetForm.css';

const TweetFormV2 = React.memo(
   ({
      auth: { user, loading },
      placeholder,
      bottomBorder,
      onFormSubmit,
      photoUploadError,
   }) => {
      const [disabled, setDisabled] = useState(true);
      const [mention, setMention] = useState(false);
      const [imagePreview, setImagePreview] = useState(null);
      const [tweetLength, setTweetLength] = useState(0);
      const [tweet, setTweet] = useState({
         content: '',
         image: null,
         mentions: [],
         hashtags: [],
      });

      let {
         handleSearchDebouncedRef,
         result,
         setResult,
         fetching,
         setFetching,
      } = useDebouncedSearch();

      const tweetInputRef = useRef();

      const spinnerColors = {
         blue: 'rgb(29, 161, 242, 1)',
         red: 'rgb(224, 36, 94)',
      };

      const normalizeLength = (value) => {
         const MAX_LENGTH = 280;
         const MIN_LENGTH = 1;
         return ((value - MIN_LENGTH) * 100) / (MAX_LENGTH - MIN_LENGTH);
      };

      const handleFileChange = (e) => {
         const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;
         if (e.target.files[0].type.match(regex)) {
            getBase64(e.target.files[0]).then((data) => setImagePreview(data));
            setTweet({ ...tweet, image: e.target.files[0] });
         } else {
            handleRemoveImage();
            photoUploadError();
         }
      };

      const handleInputChange = (e) => {
         let string = e.target.value.match(new RegExp(/@[a-zA-Z0-9._]+$/));

         if (string) {
            setMention(() => {
               setFetching(true);
               const mention = string[0].substring(1);
               //set the result to empty so it shows loader
               setResult([]);
               handleSearchDebouncedRef(mention);
               console.log(result);
               return mention;
            });
         } else {
            setResult(null);
         }
         setTweet({
            ...tweet,
            content: e.target.value,
         });
         setTweetLength(e.target.value.length);
      };

      const handleTweetSubmit = (e) => {
         console.log(tweet);
      };

      const handleRemoveImage = () => {
         setImagePreview(null);
         setTweet({ ...tweet, image: null });
      };

      useEffect(() => {
         const disableButton = tweetLength === 0 || tweetLength > 280;
         setDisabled(disableButton);
      }, [tweetLength]);

      return (
         <div className="tweetForm">
            <div className="tweetForm__wrapper">
               {/*Avatar */}
               <div className="avatar__wrapper">
                  {!loading && user !== null ? (
                     <Avatar
                        src={user.avatar}
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
                           />
                           {result && (
                              <MentionMenu
                                 users={result}
                                 fetching={fetching}
                                 username={mention}
                                 onClick={(user) => {
                                    let currentTweetValue =
                                       tweetInputRef.current.value;

                                    const username = currentTweetValue.replace(
                                       /@\b(\w+)$/,
                                       `@${user.screen_name}`
                                    );
                                    setTweet({
                                       ...tweet,
                                       content: username,
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
                              <img
                                 src={imagePreview}
                                 alt=""
                                 className="image"
                              />
                           </div>
                           <div
                              className="image__button"
                              onClick={handleRemoveImage}
                           >
                              <CgClose />
                           </div>
                        </div>
                     )}
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
                     </div>
                  </form>
               </div>
            </div>
            {bottomBorder && <div className="tweetForm__bottom-border" />}
         </div>
      );
   }
);

TweetFormV2.propTypes = {
   auth: PropTypes.object.isRequired,
   bottomBorder: PropTypes.bool,
   placeholder: PropTypes.string,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { photoUploadError })(TweetFormV2);
