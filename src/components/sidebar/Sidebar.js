import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';
import { BiHomeCircle } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
   root: {},
});

const Sidebar = (props) => {
   return (
      <div>
         <MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
         <MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
         <MenuButton text="Home" Icon={BiHomeCircle} path="/home" />
      </div>
   );
};

Sidebar.propTypes = {};

export default Sidebar;
