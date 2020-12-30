import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/MenuButton.css';

const MenuButton = ({ text, path, Icon, hideSmall }) => {
   return (
      <li className={hideSmall ? 'main-nav-item hide-small' : 'main-nav-item'}>
         <NavLink
            exact
            to={path}
            className="menu-button__link menu-item"
            activeClassName="menu-button__active"
         >
            <span className="icon">
               <Icon />
            </span>
            <span className="text">{text}</span>
         </NavLink>
      </li>
   );
};

MenuButton.propTypes = {
   path: PropTypes.string.isRequired,
};

export default MenuButton;
