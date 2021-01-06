import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBase64 } from '../../utils/imageService';
import { extractMentions, extractHashtags } from '../../utils/tweet';
import { photoUploadError } from '../../actions/tweets';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import TweetForm from './TweetForm';

import '../../styles/design/tweetForm.css';

const TweetFormWrapper = React.memo(function TweetFormWrapper({
   auth: { user, loading },
   bottomBorder,
   onFormSubmit,
   photoUploadError,
}) {
   const [disabled, setDisabled] = useState(true);
   const [submitting, setSubbmitting] = useState(false);
   const [mention, setMention] = useState(false);
   const [imagePreview, setImagePreview] = useState(null);
   const [tweetLength, setTweetLength] = useState(0);
   const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
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
   const emojiPickerRef = useRef();
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
      const mentions = extractMentions(tweet.content);
      const hashtags = extractHashtags(tweet.content);
      setTweet({
         ...tweet,
         mentions,
         hashtags,
      });
      setSubbmitting(true);
   };

   const handleRemoveImage = () => {
      setImagePreview(null);
      setTweet({ ...tweet, image: null });
   };

   const handleEmojiClose = (e) => {
      if (emojiPickerRef.current.contains(e.target)) {
         return;
      } else {
         setEmojiMenuOpen(false);
         document.removeEventListener('mousedown', handleEmojiClose);
      }
   };

   useEffect(() => {
      const disableButton = tweetLength === 0 || tweetLength > 280;
      setDisabled(disableButton);
   }, [tweetLength]);

   useEffect(() => {
      if (submitting) {
         console.log(tweet);
         setSubbmitting(false);
         setTweet({
            content: '',
            image: null,
            mentions: [],
            hashtags: [],
         });
         setImagePreview(null);
         setTweetLength(0);
      }
   }, [submitting, tweet]);

   useEffect(() => {
      if (emojiMenuOpen) {
         document.addEventListener('mousedown', handleEmojiClose);
      }
   }, [emojiMenuOpen]);

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
