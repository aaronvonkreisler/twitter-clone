import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/MenuButton.css';

const MenuButton = ({ text, path, Icon }) => {
   return (
      <Link to={path} className="menu-button__link">
         <div className="menu-button__root">
            <div className="menu-button__icon">
               <Icon />
            </div>
            <div className="menu-button__text">
               <span>{text}</span>
            </div>
         </div>
      </Link>
   );
};

MenuButton.propTypes = {
   text: PropTypes.string.isRequired,
   path: PropTypes.string.isRequired,
   Icon: PropTypes.element.isRequired,
};

export default MenuButton;
