import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, CircularProgress } from '@material-ui/core';
import omit from 'lodash/omit';
import { addTweet } from '../../actions/tweets';
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

const TweetForm = ({ auth: { user, loading }, addTweet }) => {
   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   );

   const [tweetLength, setTweetLength] = useState(0);

   const normalizeLength = (value) =>
      ((value - MIN_LENGTH) * 100) / (MAX_LENGTH - MIN_LENGTH);

   const handleTweetSubmit = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));

      addTweet({ content: rawContent });
      setTimeout(() => {
         setEditorState(() => EditorState.createEmpty());
      }, 250);
   };

   const handleCharacterCountChange = (str) => {
      const charRegex = new RegExp(/./, 'mg');
      const characterArray = str.match(charRegex);

      if (characterArray) {
         setTweetLength(characterArray.length);
      }

      if (characterArray && characterArray.length > 280) {
         return `-${characterArray.length - MAX_LENGTH}`;
      }
      return 0;
   };
   return (
      <div className="tweetForm">
         <form>
            <div className="tweetForm__input">
               {!loading && user !== null ? (
                  <Avatar
                     style={{ height: '49px', width: '49px' }}
                     src={user.avatar}
                  />
               ) : (
                  <Avatar style={{ height: '49px', width: '49px' }} />
               )}
               {/* <input type="text" placeholder="What's happening?" /> */}
               <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  plugins={editorPlugins}
                  placeholder="What's happening?"
               />
            </div>
            <div className="flex flex-row justify-between tweetForm_actions">
               <div className="flex flex-row justify-start emojiButton">
                  <EmojiSelect />
               </div>
               <div className="flex flex-row justify-between">
                  <div
                     className={
                        tweetLength >= 281 ? 'counter' : 'counter-hidden'
                     }
                  >
                     <CustomCounter
                        limit={280}
                        countFunction={handleCharacterCountChange}
                     />
                  </div>

                  <div className="counterProgress flex flex-col justify-center">
                     <CircularProgress
                        variant="static"
                        value={normalizeLength(tweetLength)}
                        size={tweetLength <= 280 ? 20 : 30}
                        thickness={2.6}
                        style={
                           tweetLength <= 280
                              ? { color: 'rgb(29, 161, 242, 1)' }
                              : { display: 'none' }
                        }
                     />
                  </div>

                  <Button
                     className="tweetForm__button"
                     onClick={handleTweetSubmit}
                     disabled={
                        tweetLength === 0 || tweetLength >= 280 ? true : false
                     }
                  >
                     Tweet
                  </Button>
               </div>
            </div>
         </form>
         <div className="tweetForm__bottom-border"></div>
      </div>
   );
};

TweetForm.propTypes = {
   auth: PropTypes.object.isRequired,
   addTweet: PropTypes.func,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { addTweet })(TweetForm);
