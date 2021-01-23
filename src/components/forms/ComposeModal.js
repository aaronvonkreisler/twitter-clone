import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { addTweet } from '../../actions/tweets';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import TweetFormWrapper from './TweetFormWrapper';
import '../../styles/design/replyModal.css';

const ComposeModal = ({ addTweet, open, setOpen }) => {
   const fullScreen = useMediaQuery('(max-width: 500px)');

   const onFormSubmit = (content) => {
      addTweet({ content });
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
            <DialogContent style={{ overflowY: 'initial' }}>
               <TweetFormWrapper
                  onTweetSubmit={onFormSubmit}
                  bottomBorder={false}
                  withMultipleRows
               />
               {fullScreen && <div style={{ minHeight: '100px' }}></div>}
            </DialogContent>
         </Dialog>
      </div>
   );
};

ComposeModal.propTypes = {
   addTweet: PropTypes.func.isRequired,
};

export default connect(null, { addTweet })(ComposeModal);
