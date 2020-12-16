import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   useMediaQuery,
   useTheme,
} from '@material-ui/core';
import { addTweet } from '../../actions/tweets';
import '../../styles/design/replyModal.css';

const ComposeModal = ({ addTweet, open, setOpen }) => {
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
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
         </Dialog>
      </div>
   );
};

ComposeModal.propTypes = {
   addTweet: PropTypes.func.isRequired,
};

export default connect(null, { addTweet })(ComposeModal);
