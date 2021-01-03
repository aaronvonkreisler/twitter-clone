import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuButton = ({
   text,
   path,
   Icon,
   hideSmall,
   hideMedium,
   link,
   ...props
}) => {
   const small = hideSmall ? 'hide-small' : '';
   const medium = hideMedium ? 'hide-medium' : '';
   return (
      <li className={`main-nav-item ${small} ${medium}`}>
         {link && (
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
         )}
         {!link && (
            <div className="menu-item" {...props}>
               <span className="icon">
                  <Icon />
               </span>
               <span className="text">{text}</span>
            </div>
         )}
      </li>
   );
};

MenuButton.defaultProps = {
   link: true,
};
MenuButton.propTypes = {
   path: PropTypes.string,
   link: PropTypes.bool,
};

export default MenuButton;
