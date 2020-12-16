import React from 'react';
import PropTypes from 'prop-types';

const UploadProfilePic = ({
   setProfilePic,
   profilePic,
   handlePictureSubmit,
}) => {
   return (
      <div>
         <input onChange={setProfilePic} type="file" />
         <button onClick={handlePictureSubmit}>Upload Photo</button>
      </div>
   );
};

UploadProfilePic.propTypes = {};

export default UploadProfilePic;
