import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design/login.css';

const SelectBox = ({
   value,
   onChange,
   label,
   inputName,
   inputType,
   children,
   ...props
}) => {
   return (
      <div className="label-container">
         <label className="label">
            <div className="label-sub1">
               <div className="label-sub2">
                  <span>{label}</span>
                  <div className="label-sub3">
                     <div className="label-sub4">
                        <select
                           className="email-input"
                           name={inputName}
                           value={value}
                           onChange={onChange}
                           {...props}
                        >
                           {children}
                        </select>
                     </div>
                  </div>
               </div>
            </div>
         </label>
      </div>
   );
};

SelectBox.propTypes = {
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   label: PropTypes.string.isRequired,
   inputName: PropTypes.string.isRequired,
};

export default SelectBox;
