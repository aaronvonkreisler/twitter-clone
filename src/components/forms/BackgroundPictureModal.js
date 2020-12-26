import React, { useState } from 'react';
import { connect } from 'react-redux';
import Cropper from 'react-cropper';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  IconButton,
  useTheme,
} from '@material-ui/core';
import { FiCamera } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { uploadCoverPicture } from '../../actions/profile';
import OutlineButton from '../layout/OutlineButton';
import '../../styles/design/utils.css';
import 'cropperjs/dist/cropper.css';
import '../../styles/design/profilePictureModal.css';

const BackgroundPictureModal = ({
  open,
  setOpen,
  defaultPicture,
  uploadCoverPicture,
  userId,
}) => {
  const [image, setImage] = useState(defaultPicture);
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

  const onPictureSubmit = () => {
    const canvas = cropper.getCroppedCanvas();
    if (canvas == null) {
      alert('Could not upload image. Please upload an image file.');
      return;
    }

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      uploadCoverPicture(formData, userId);
    });
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
          <div className="profilePicture__title">
            <div className="profilePicture__left">
              <div className="icon" onClick={() => setOpen(false)}>
                <CgClose />
              </div>
              <div className="text">
                <span>Edit media</span>
              </div>
            </div>
            <div className="profilePicture__right">
              <OutlineButton text="Apply" onClick={onPictureSubmit} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div>
            <div className="profilePictureWrapper">
              <div className="uploadButtonWrapper">
                <input
                  type="file"
                  name="image"
                  id="upload-picture"
                  accept="image/jpeg, image/png"
                  onChange={onInputChange}
                  className="profilePicture__input"
                />
                <label htmlFor="upload-picture">
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    className="uploadButton"
                  >
                    <FiCamera />
                  </IconButton>
                </label>
              </div>
              <Cropper
                style={{ height: 200, width: '100%' }}
                initialAspectRatio={16 / 9}
                aspectRatio={16 / 9}
                preview=".img-preview"
                src={image}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                cropBoxResizable={false}
                cropBoxMovable={false}
                dragMode="move"
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

BackgroundPictureModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  uploadCoverPicture: PropTypes.func.isRequired,
};

export default connect(null, { uploadCoverPicture })(BackgroundPictureModal);
