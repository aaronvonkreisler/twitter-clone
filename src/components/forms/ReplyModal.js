import React from 'react';
import { connect } from 'react-redux';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   useMediaQuery,
   useTheme,
} from '@material-ui/core';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';
import Tweet from '../tweets/Tweet';
import TweetForm from '../feed/TweetForm';
import { replyToTweet } from '../../actions/tweets';
import '../../styles/design/replyModal.css';

const ReplyModal = ({ tweet, open, setOpen, replyToTweet }) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

   const handleTweetReply = (content) => {
      replyToTweet(tweet._id, { content });
   };

   return (
      <div className="replyModal">
         <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            fullScreen={fullScreen}
            scroll="body"
         >
            <DialogTitle disableTypography>
               <div className="flex flex-row align-center justify-start close-icon">
                  <div className="d-inline-flex">
                     <div
                        className="icon__border"
                        onClick={() => setOpen(false)}
                     >
                        <CgClose />
                     </div>
                  </div>
               </div>
            </DialogTitle>
            <DialogContent>
               <Tweet
                  tweet={tweet}
                  displayActions={false}
                  replyView
                  bottomBorder={false}
               />

               <div className="flex flex-row justify-start middleArea">
                  <div className="reply-line">
                     <div className="line-display"></div>
                  </div>
                  <div className="replying_to">
                     {tweet !== null && (
                        <span>
                           Replying to{' '}
                           <span className="display_name">
                              @{tweet.user.screen_name}
                           </span>
                        </span>
                     )}
                  </div>
               </div>
               <TweetForm
                  onFormSubmit={handleTweetReply}
                  placeholder="Tweet your reply"
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};

ReplyModal.propTypes = {
   tweet: PropTypes.object,
   replyToTweet: PropTypes.func.isRequired,
};

export default connect(null, { replyToTweet })(ReplyModal);
