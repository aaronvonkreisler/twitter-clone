import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { CgClose } from "react-icons/cg";
import OutlineButton from "../layout/OutlineButton";
import TextBox from "../layout/TextBox";
import PropTypes from "prop-types";
import "../../styles/design/utils.css";
import "../../styles/design/profile.css";
import "../../styles/design/editProfileModal.css";

const EditProfileModal = ({ user, open, setOpen, profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  });

  const { name, bio, location, website } = formData;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="editProfile">
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
            </div>
            <div className="profilePicture__right">
              <OutlineButton text="Save" onClick={() => alert("Hi")} />
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
              </div>
              <div className="userImage__container">
                <Avatar src={profile.avatar} alt="User profile" />
              </div>
            </div>
            <div className="textFieldsWrapper">
              <TextBox
                inputName="name"
                inputType="text"
                label="Name"
                value={name}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "15px" }}
              />
              <TextBox
                inputName="bio"
                inputType="text"
                label="Bio"
                value={bio}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "15px" }}
              />
              <TextBox
                inputName="location"
                inputType="text"
                label="Location"
                value={location}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "15px" }}
              />
              <TextBox
                inputName="website"
                inputType="text"
                label="Website"
                value={website}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "15px" }}
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
