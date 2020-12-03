import React, { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   useMediaQuery,
   useTheme,
} from '@material-ui/core';

import RegisterForm from '../forms/RegisterForm';

import '../../styles/design/utils.css';
import '../../styles/design/registerModal.css';

const RegisterModal = ({ open, setOpen }) => {
   const handleClose = () => {
      setOpen(false);
   };
   return (
      <div className="register-modal">
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="sign-up-dialog"
            fullWidth
            maxWidth="sm"
         >
            <DialogTitle>
               <div
                  className="flex flex-row justify-center align-center"
                  id="dialog-title"
               >
                  <FaTwitter className="modal-icon" />
               </div>
            </DialogTitle>

            <DialogContent>
               <div className="dialog-content-wrapper">
                  <div className="flex flex-col justify-start">
                     <div className="header">
                        <h2>Create your account</h2>
                     </div>
                     <div className="register-form">
                        <RegisterForm />
                     </div>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default RegisterModal;
