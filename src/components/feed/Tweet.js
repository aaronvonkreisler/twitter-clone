import React from 'react';
import PropTypes from 'prop-types';
import { convertFromRaw, EditorState, CompositeDecorator } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import omit from 'lodash/omit';
import { Avatar } from '@material-ui/core';
import { GoVerified } from 'react-icons/go';
import { BsChat } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { CgMore } from 'react-icons/cg';
import ViewOnlyEditor from '../layout/ViewOnlyEditor';

import '../../styles/design/tweet.css';

const linkifyPlugin = createLinkifyPlugin({
   target: '_blank',
   // eslint-disable-next-line jsx-a11y/anchor-has-content
   component: (params) => <a {...omit(params, ['blockKey'])} />,
});

const hashtagPlugin = createHashtagPlugin();

const viewOnlyPlugins = [linkifyPlugin, hashtagPlugin];

const getPluginDecoratorArray = () => {
   let decorators = [];
   let plugin;
   // check each plugin that will be used in the editor for decorators
   // (retrieve listOfPlugins however makes sense in your code)
   for (plugin of viewOnlyPlugins) {
      if (plugin.decorators !== null && plugin.decorators !== undefined) {
         // if the plugin has any decorators, add them to a list of all decorators from all plugins
         decorators = decorators.concat(plugin.decorators);
      }
   }
   return decorators;
};

const grabAllPluginDecorators = () => {
   return new MultiDecorator([
      new CompositeDecorator(getPluginDecoratorArray()),
   ]);
};

const convertToEditorState = (editorContent) => {
   let decorator = grabAllPluginDecorators();
   const content = convertFromRaw(JSON.parse(editorContent));
   const newEditorState = EditorState.createWithContent(content, decorator);
   return newEditorState;
};

const Tweet = ({ tweet }) => {
   return (
      <div className="tweet__root">
         {tweet && (
            <div className="flex flex-col">
               <article className="tweet__wrapper flex flex-row">
                  <div className=" tweet__avatar flex flex-col">
                     <Avatar src={tweet.user.avatar} />
                  </div>
                  <div className="tweet__content flex flex-col justify-between">
                     <div className="flex flex-row justify-between tweet__name">
                        <div className="flex flex-row justify-between align-start names__display">
                           <div className="flex flex-row justify-between">
                              <span className="display_name">
                                 {tweet.user.name}
                              </span>
                              {tweet.user.verified && (
                                 <span className="verified-badge">
                                    <GoVerified />
                                 </span>
                              )}
                              <span className="screen_name">
                                 @{tweet.user.screen_name}
                              </span>
                           </div>
                        </div>
                        <div className="top-right__actionArea">
                           <div className="flex flex-row justify-start top-right-icon">
                              <div className="d-inline-flex">
                                 <div className="icon__border"></div>
                                 <CgMore />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Content goes here */}
                     <ViewOnlyEditor
                        editorState={convertToEditorState(tweet.content)}
                        plugins={viewOnlyPlugins}
                     />
                     <div className="tweet__bottom-actionArea flex flex-row justify-between">
                        <div className="tweetAction-item">
                           <div className="flex flex-col justify-center">
                              <div className="action-wrapper comment_wrapper">
                                 <div className="d-inline-flex buttonDisplay">
                                    <div className="iconBackgroundDisplay comment_display" />
                                    <BsChat />
                                 </div>
                                 <div className="metrics">
                                    <span className="metrics__item">
                                       <span> {tweet.replies_count}</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tweetAction-item">
                           <div className="flex flex-col justify-center">
                              <div className="action-wrapper retweet_wrapper">
                                 <div className="d-inline-flex buttonDisplay">
                                    <div className="iconBackgroundDisplay retweet_display" />
                                    <AiOutlineRetweet />
                                 </div>
                                 <div className="metrics">
                                    <span className="metrics__item">
                                       <span> {tweet.retweet_count}</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tweetAction-item">
                           <div className="flex flex-col justify-center">
                              <div className="action-wrapper favorites_wrapper">
                                 <div className="d-inline-flex buttonDisplay">
                                    <div className="iconBackgroundDisplay favorites_display" />
                                    <BsHeart />
                                 </div>
                                 <div className="metrics">
                                    <span className="metrics__item">
                                       <span> {tweet.favorites_count}</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tweetAction-item">
                           <div className="flex flex-col justify-center">
                              <div className="action-wrapper comment_wrapper">
                                 <div className="d-inline-flex buttonDisplay">
                                    <div className="iconBackgroundDisplay comment_display" />
                                    <BsUpload />
                                 </div>
                                 <div className="metrics"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </article>
            </div>
         )}
      </div>
   );
};

Tweet.propTypes = {
   tweet: PropTypes.object.isRequired,
};

export default Tweet;
