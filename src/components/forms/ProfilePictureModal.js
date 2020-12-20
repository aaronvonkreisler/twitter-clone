import React, { useState } from 'react';
import Cropper from 'react-cropper';
import PropTypes from 'prop-types';
import {
   Dialog,
   DialogContent,
   DialogTitle,
   useMediaQuery,
   useTheme,
} from '@material-ui/core';
import OutlineButton from '../layout/OutlineButton';
import '../../styles/design/utils.css';
import 'cropperjs/dist/cropper.css';

const ProfilePictureModal = ({ open, setOpen, defaultPicture }) => {
   const [image, setImage] = useState(defaultPicture);
   const [cropData, setCropData] = useState('#');
   const [cropper, setCropper] = useState();

   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

   const onInputChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
         setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
   };

   const getCropData = () => {
      if (typeof cropper !== 'undefined') {
         setCropData(cropper.getCroppedCanvas().toDataURL());
      } else {
         alert('Nah fam');
      }
   };

   const onPictureSubmit = () => {
      getCropData();
   };
   return (
      <React.Fragment>
         <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            fullScreen={fullScreen}
            scroll="body"
         >
            <DialogTitle disableTypography>
               <div className="flex flex-row align-center justify-end close-icon">
                  <div className="d-inline-flex">
                     <OutlineButton text="Save" onClick={onPictureSubmit} />
                  </div>
               </div>
            </DialogTitle>
            <DialogContent>
               <div>
                  <div>
                     <input
                        type="file"
                        name="image"
                        accept="image/jpeg, image/png"
                        onChange={onInputChange}
                     />
                     <Cropper
                        style={{ height: 200, width: '100%' }}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={2}
                        guides={true}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                           setCropper(instance);
                        }}
                     />
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   );
};

ProfilePictureModal.propTypes = {
   open: PropTypes.bool.isRequired,
   setOpen: PropTypes.func.isRequired,
};

export default ProfilePictureModal;
