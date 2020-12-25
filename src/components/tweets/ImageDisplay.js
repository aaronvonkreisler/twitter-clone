import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/design/imageDisplay.css';

const ImageDisplay = ({ image, path }) => {
   return (
      <Link to={path}>
         <div className="imageDisplay">
            <div className="imageDisplay__wrapper">
               <div className="presentation">
                  <div className="presentation__empty"></div>
                  <div className="imageContainer">
                     <div className="image">
                        <div
                           className="backgroundCover"
                           style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <img src={image} alt="" className="imageItem" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};

ImageDisplay.propTypes = {
   image: PropTypes.string.isRequired,
};

export default ImageDisplay;
