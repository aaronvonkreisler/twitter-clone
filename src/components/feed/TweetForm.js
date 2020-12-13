import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, CircularProgress } from '@material-ui/core';
import omit from 'lodash/omit';

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

const TweetForm = ({
   auth: { user, loading },
   placeholder,
   bottomBorder,
   onFormSubmit,
}) => {
   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   );

   const [disabled, setDisabled] = useState(true);

   const normalizeLength = (value) =>
      ((value - MIN_LENGTH) * 100) / (MAX_LENGTH - MIN_LENGTH);

   const handleTweetSubmit = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));

      onFormSubmit(rawContent);
      setTimeout(() => {
         setEditorState(() => EditorState.createEmpty());
      }, 250);
   };

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
                  <div className="toolbar__root">
                     <div className="toolbar__addOns">
                        <EmojiSelect />
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
};

TweetForm.propTypes = {
   auth: PropTypes.object.isRequired,
   bottomBorder: PropTypes.bool,
   placeholder: PropTypes.string,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(TweetForm);
