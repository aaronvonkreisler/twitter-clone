import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import TweetFormWrapper from './TweetFormWrapper';
import { replyToTweet } from '../../actions/tweets';
import { closeModal } from '../../actions/modal';
import '../../styles/design/replyModal.css';

const ReplyModal = ({ modal: { tweet, open }, replyToTweet, closeModal }) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
   let history = useHistory();
   const handleTweetReply = (reply) => {
      const { location } = history;
      replyToTweet(tweet._id, reply, location);

      setTimeout(() => {
         closeModal();
      }, 250);
   };
   return (
      <div className="replyModal">
         <Dialog
            open={open}
            onClose={() => closeModal()}
            fullWidth
            fullScreen={fullScreen}
            scroll="body"
         >
            <DialogTitle disableTypography>
               <div className="flex flex-row align-center justify-start close-icon">
                  <div className="d-inline-flex">
                     <div className="icon__border" onClick={() => closeModal()}>
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
                     {tweet !== null && open && (
                        <span>
                           Replying to{' '}
                           <span className="display_name">
                              @{tweet.user.screen_name}
                           </span>
                        </span>
                     )}
                  </div>
               </div>
               <TweetFormWrapper
                  onTweetSubmit={handleTweetReply}
                  placeholder="Tweet your reply"
                  withEmojiMenuAbove
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};

ReplyModal.propTypes = {
   tweet: PropTypes.object,
   replyToTweet: PropTypes.func.isRequired,
   open: PropTypes.bool,
};

const mapStateToProps = (state) => ({
   modal: state.modal,
});

export default connect(mapStateToProps, {
   replyToTweet,
   closeModal,
})(ReplyModal);
