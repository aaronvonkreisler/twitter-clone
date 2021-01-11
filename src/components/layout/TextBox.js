import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/design/login.css';
import '../../styles/design/textBox.css';
const TextBox = ({
  value,
  onChange,
  label,
  inputName,
  inputType,
  textArea,
  style,
  counter,
  count,
  maxLength,
  rows,

  ...props
}) => {
  return (
    <div className="label-container" style={style}>
      <label className="label">
        <div className="label-sub1">
          <div className="label-sub2">
            {counter ? (
              <div className="displayCounter">
                <div className="text">{label}</div>
                <div className="number">
                  {count}/{maxLength}
                </div>
              </div>
            ) : (
              <span>{label}</span>
            )}
            <div className="label-sub3">
              <div className="label-sub4">
                {textArea ? (
                  <textarea
                    name={inputName}
                    value={value}
                    onChange={onChange}
                    className="email-input"
                    maxLength={maxLength}
                    rows={rows}
                  />
                ) : (
                  <input
                    type={inputType}
                    className="email-input"
                    name={inputName}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    {...props}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

TextBox.defaultProps = {
  counter: false,
};

TextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  counter: PropTypes.bool,
  count: PropTypes.number,
  textArea: PropTypes.bool,
};

export default TextBox;
