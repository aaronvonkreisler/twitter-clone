import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64, uploadPhotoForTweet } from '../../utils/imageService';

import { photoUploadError } from '../../actions/tweets';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import TweetForm from './TweetForm';

import '../../styles/design/tweetForm.css';

const TweetFormWrapper = React.memo(function TweetFormWrapper({
   auth: { user, loading },
   bottomBorder,
   onTweetSubmit,
   onTweetWithImageSubmit,
   photoUploadError,
   withEmojiMenuAbove,
   withMultipleRows,
}) {
   const [disabled, setDisabled] = useState(true);

   const [mention, setMention] = useState(false);
   const [imagePreview, setImagePreview] = useState(null);
   const [fileToUpload, setFileToUpload] = useState(null);
   const [tweetLength, setTweetLength] = useState(0);
   const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
   const [tweet, setTweet] = useState({
      content: '',
      image: null,
   });

   let {
      handleSearchDebouncedRef,
      result,
      setResult,
      fetching,
      setFetching,
   } = useDebouncedSearch();

   const tweetInputRef = useRef();
   const emojiPickerRef = useRef();
   const normalizeLength = (value) => {
      const MAX_LENGTH = 280;
      const MIN_LENGTH = 1;
      return ((value - MIN_LENGTH) * 100) / (MAX_LENGTH - MIN_LENGTH);
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;

      if (file.type.match(regex)) {
         getBase64(file).then((data) => setImagePreview(data));
         setFileToUpload(file);
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

   const onEmojiClick = (event, emojiObject) => {
      const { emoji } = emojiObject;
      let currentTweetValue = tweetInputRef.current.value;
      currentTweetValue += emoji;
      setTweet({
         ...tweet,
         content: currentTweetValue,
      });
      setDisabled(false);
      tweetInputRef.current.focus();
   };

   const handleTweetSubmit = (e) => {
      if (fileToUpload !== null) {
         const formData = new FormData();
         formData.set('content', tweet.content);
         formData.append('image', fileToUpload);
         onTweetWithImageSubmit(formData);
         setTweet({
            content: '',
            image: null,
         });
         setImagePreview(null);
         setTweetLength(0);
         setFileToUpload(null);
      } else {
         onTweetSubmit(tweet);
         setTweet({
            content: '',
            image: null,
         });
         setImagePreview(null);
         setTweetLength(0);
         setFileToUpload(null);
      }
   };

   const handleRemoveImage = useCallback(() => {
      setImagePreview(null);
      setFileToUpload(null);
      setTweet({ ...tweet, image: null });
   }, [tweet]);

   const handleEmojiClose = useCallback((e) => {
      if (emojiPickerRef.current.contains(e.target)) {
         return;
      } else {
         setEmojiMenuOpen(false);
         document.removeEventListener('mousedown', handleEmojiClose);
      }
   }, []);

   useEffect(() => {
      const disableButton = tweetLength === 0 || tweetLength > 280;
      setDisabled(disableButton);
   }, [tweetLength]);

   useEffect(() => {
      if (emojiMenuOpen) {
         document.addEventListener('mousedown', handleEmojiClose);
      }
   }, [emojiMenuOpen, handleEmojiClose]);

   // useEffect(() => {
   //    async function uploadImageToDb() {
   //       const validImage = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;

   //       if (imageFile !== null) {
   //          if (imageFile.type.match(validImage)) {
   //             const imagePath = await uploadPhotoForTweet(imageFile);
   //             setTweet({ ...tweet, image: imagePath });
   //             setImageFile(null);
   //          } else {
   //             handleRemoveImage();
   //             photoUploadError();
   //          }
   //       }
   //    }

   //    uploadImageToDb();
   // }, [handleRemoveImage, imageFile, photoUploadError, tweet]);

   return (
      <TweetForm
         user={user}
         loading={loading}
         tweet={tweet}
         setTweet={setTweet}
         tweetInputRef={tweetInputRef}
         emojiPickerRef={emojiPickerRef}
         handleInputChange={handleInputChange}
         result={result}
         fetching={fetching}
         setResult={setResult}
         mention={mention}
         imagePreview={imagePreview}
         handleRemoveImage={handleRemoveImage}
         handleFileChange={handleFileChange}
         emojiMenuOpen={emojiMenuOpen}
         setEmojiMenuOpen={setEmojiMenuOpen}
         onEmojiClick={onEmojiClick}
         tweetLength={tweetLength}
         normalizeLength={normalizeLength}
         disabled={disabled}
         handleTweetSubmit={handleTweetSubmit}
         bottomBorder={bottomBorder}
         withEmojiMenuAbove={withEmojiMenuAbove}
         withMultipleRows={withMultipleRows}
      />
   );
});

TweetFormWrapper.propTypes = {
   auth: PropTypes.object.isRequired,
   bottomBorder: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { photoUploadError })(TweetFormWrapper);
