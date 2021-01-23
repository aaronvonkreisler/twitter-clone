import React from 'react';

import PropTypes from 'prop-types';
import '../../styles/design/imageDisplay.css';

const ImageDisplay = ({ image, withPreview, fullDisplay }) => {
   return (
      <React.Fragment>
         {withPreview && (
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
         )}
         {fullDisplay && (
            <div className="imageDisplay">
               <img src={image} alt="" className="content-image" />
            </div>
         )}
      </React.Fragment>
   );
};

ImageDisplay.defaultProps = {
   withPreview: true,
};

ImageDisplay.propTypes = {
   image: PropTypes.string.isRequired,
   withPreview: PropTypes.bool,
};

export default ImageDisplay;
