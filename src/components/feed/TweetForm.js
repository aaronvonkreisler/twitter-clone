import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';
import omit from 'lodash/omit';
// Editor Dependencies -------------------------
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
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
const editorPlugins = [linkifyPlugin, emojiPlugin, hashtagPlugin];
const { EmojiSelect } = emojiPlugin;
const MAX_LENGTH = 280;

const TweetForm = ({ auth: { user, loading } }) => {
   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   );

   const handleTweetSubmit = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));

      console.log(rawContent);
   };

   const _handleBeforeInput = () => {
      const currentContent = editorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText('').length;
      if (currentContentLength > MAX_LENGTH - 1) {
         return 'handled';
      }
   };

   const _handlePastedText = (pastedText) => {
      const currentContent = editorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText('').length;

      if (currentContentLength + pastedText.length > MAX_LENGTH) {
         console.log('you can type max ten characters');

         return 'handled';
      }
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
                  handleBeforeInput={_handleBeforeInput}
                  handlePastedText={_handlePastedText}
                  placeholder="What's happening?"
               />
            </div>
            <div className="flex flex-row justify-between tweetForm_actions">
               <div>
                  <EmojiSelect />
               </div>
               <div>
                  <Button
                     className="tweetForm__button"
                     onClick={handleTweetSubmit}
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
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(TweetForm);
