import React from 'react';
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
import '../../styles/design/replyModal.css';

const ReplyModal = ({ tweet, open, setOpen }) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
   const handleReply = (content) => {
      console.log(content);
   };
   return (
      <div className="replyModal">
         <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            fullScreen={fullScreen}
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
                  onFormSubmit={handleReply}
                  placeholder="Tweet your reply"
               />
            </DialogContent>
         </Dialog>
      </div>
   );
};

ReplyModal.propTypes = {
   tweet: PropTypes.object,
};

export default ReplyModal;
