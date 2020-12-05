import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/MenuButton.css';

const MenuButton = ({ text, path, Icon, large }) => {
   return (
      <Link to={path} className="menu-button__link">
         <div className="menu-button__root">
            <div className="menu-button__icon">
               <Icon />
            </div>
            {large && (
               <div className="menu-button__text">
                  <span>{text}</span>
               </div>
            )}
         </div>
      </Link>
   );
};

MenuButton.propTypes = {
   path: PropTypes.string.isRequired,
   Icon: PropTypes.element.isRequired,
};

export default MenuButton;
