import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { CgClose } from 'react-icons/cg';
import { FiCamera } from 'react-icons/fi';
import OutlineButton from '../layout/OutlineButton';
import TextBox from '../layout/TextBox';
import PropTypes from 'prop-types';
import '../../styles/design/utils.css';
import '../../styles/design/profile.css';
import '../../styles/design/editProfileModal.css';

import BackgroundPictureModal from './BackgroundPictureModal';
import ProfilePictureModal from './ProfilePictureModal';

const EditProfileModal = ({ user, open, setOpen, profile }) => {
  const [backgroundPicOpen, setBackgroundPicOpen] = useState(false);
  const [profilePicOpen, setProfilePicOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name ? profile.name : '',
    bio: profile.bio ? profile.bio : '',
    location: profile.location ? profile.location : '',
    website: profile.website ? profile.website : '',
  });

  const { name, bio, location, website } = formData;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="editProfile">
      <BackgroundPictureModal
        open={backgroundPicOpen}
        setOpen={setBackgroundPicOpen}
        defaultPicture={profile.backgroundPicture}
      />
      <ProfilePictureModal
        open={profilePicOpen}
        setOpen={setProfilePicOpen}
        defaultPicture={profile.avatar}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogTitle disableTypography>
          <div className="profilePicture__title">
            <div className="profilePicture__left">
              <div className="icon" onClick={() => setOpen(false)}>
                <CgClose />
              </div>
              <div className="text">
                <span>Edit profile</span>
              </div>
            </div>
            <div className="profilePicture__right">
              <OutlineButton text="Save" onClick={() => alert('Hi')} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="profileWrapper">
            <div className="coverPhoto__section">
              <div className="coverPhoto__container">
                {profile.backgroundPicture && (
                  <img src={profile.backgroundPicture} alt="Background" />
                )}
                <IconButton
                  className="coverPhoto__button"
                  onClick={() => setBackgroundPicOpen(true)}
                >
                  <FiCamera />
                </IconButton>
              </div>
              <div className="userImage__container">
                <Avatar src={profile.avatar} alt="User profile" />
                <IconButton
                  className="profilePictureButton"
                  onClick={() => setProfilePicOpen(true)}
                >
                  <FiCamera />
                </IconButton>
              </div>
            </div>
            <div className="textFieldsWrapper">
              <TextBox
                inputName="name"
                inputType="text"
                label="Name"
                value={name}
                onChange={handleChange}
                style={{ width: '100%', paddingLeft: '15px' }}
              />
              <TextBox
                inputName="bio"
                inputType="text"
                label="Bio"
                value={bio}
                onChange={handleChange}
                style={{ width: '100%', paddingLeft: '15px' }}
              />
              <TextBox
                inputName="location"
                inputType="text"
                label="Location"
                value={location}
                onChange={handleChange}
                style={{ width: '100%', paddingLeft: '15px' }}
              />
              <TextBox
                inputName="website"
                inputType="text"
                label="Website"
                value={website}
                onChange={handleChange}
                style={{ width: '100%', paddingLeft: '15px' }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

EditProfileModal.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default EditProfileModal;
