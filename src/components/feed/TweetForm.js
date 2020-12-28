import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
   Avatar,
   Button,
   CircularProgress,
   IconButton,
} from '@material-ui/core';
import omit from 'lodash/omit';
import { FiImage } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { getBase64, uploadPhotoForTweet } from '../../utils/imageService';
import { photoUploadError } from '../../actions/tweets';
// Editor Dependencies -------------------------
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import PropTypes from 'prop-types';
import './styles/TweetForm.css';

const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',
   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});

const emojiPlugin = createEmojiPlugin();
const hashtagPlugin = createHashtagPlugin();
const counterPlugin = createCounterPlugin();
const editorPlugins = [
   linkifyPlugin,
   emojiPlugin,
   hashtagPlugin,
   counterPlugin,
];

const { EmojiSelect } = emojiPlugin;
const { CustomCounter } = counterPlugin;
const MAX_LENGTH = 280;
const MIN_LENGTH = 1;

const TweetForm = React.memo(
   ({
      auth: { user, loading },
      placeholder,
      bottomBorder,
      onFormSubmit,
      photoUploadError,
   }) => {
      const [editorState, setEditorState] = useState(() =>
         EditorState.createEmpty()
      );
      const [imagePreview, setImagePreview] = useState(null);
      const [imageFile, setImageFile] = useState(null);
      const [imageLink, setImageLink] = useState('');
      const [disabled, setDisabled] = useState(true);

      const handleFileChange = (e) => {
         getBase64(e.target.files[0]).then((data) => setImagePreview(data));
         setImageFile(e.target.files[0]);
      };

      const normalizeLength = (value) =>
         ((value - MIN_LENGTH) * 100) / (MAX_LENGTH - MIN_LENGTH);

      const handleTweetSubmit = () => {
         const contentState = editorState.getCurrentContent();
         const rawContent = JSON.stringify(convertToRaw(contentState));

         onFormSubmit(rawContent, imageLink);
         setTimeout(() => {
            setEditorState(() => EditorState.createEmpty());
            setImagePreview(null);
            setImageFile(null);
            setImageLink(null);
            setDisabled(true);
         }, 250);
      };

      const handleRemoveImage = () => {
         setImagePreview(null);
         setImageLink('');
         setImageFile(null);
      };

      useEffect(() => {
         async function uploadImageToDb() {
            const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;

            if (imageFile !== null) {
               if (imageFile.type.match(regex)) {
                  const imagePath = await uploadPhotoForTweet(imageFile);
                  setImageLink(imagePath);
               } else {
                  handleRemoveImage();
                  photoUploadError();
               }
            }
         }

         uploadImageToDb();
      }, [imageFile, photoUploadError]);

      const handleCharacterCountChange = (str) => {
         const charRegex = new RegExp(/./, 'mg');
         const characterArray = str.match(charRegex);

         if (characterArray) {
            if (characterArray.length > 1) setDisabled(false);
            if (characterArray.length > 280) setDisabled(true);
            return (
               <CircularProgress
                  variant="static"
                  value={normalizeLength(characterArray.length)}
                  size={characterArray.length <= 280 ? 20 : 30}
                  thickness={2.6}
                  style={
                     characterArray.length <= 280
                        ? { color: 'rgb(29, 161, 242, 1)' }
                        : { color: 'red' }
                  }
               />
            );
         }
         return;
      };
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
                           <Editor
                              editorState={editorState}
                              onChange={setEditorState}
                              plugins={editorPlugins}
                              placeholder={placeholder}
                           />
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
                           <EmojiSelect />
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
                              <CustomCounter
                                 limit={280}
                                 countFunction={handleCharacterCountChange}
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

TweetForm.propTypes = {
   auth: PropTypes.object.isRequired,
   bottomBorder: PropTypes.bool,
   placeholder: PropTypes.string,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { photoUploadError })(TweetForm);
