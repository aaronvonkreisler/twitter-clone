import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design/login.css';
const TextBox = ({ value, onChange, label, inputName, inputType }) => {
   return (
      <div className="label-container">
         <label className="label">
            <div className="label-sub1">
               <div className="label-sub2">
                  <span>{label}</span>
                  <div className="label-sub3">
                     <div className="label-sub4">
                        <input
                           type={inputType}
                           className="email-input"
                           name={inputName}
                           value={value}
                           onChange={onChange}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </label>
      </div>
   );
};

TextBox.propTypes = {
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   label: PropTypes.string.isRequired,
   inputName: PropTypes.string.isRequired,
};

export default TextBox;
