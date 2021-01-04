import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/layout/Header';
import { FiMail } from 'react-icons/fi';

const iconStyle = {
   fill: 'none',
};
const Messages = (props) => {
   return (
      <React.Fragment>
         <Header
            text="Messages"
            rightIcon
            IconComponent={FiMail}
            overrideStyle={iconStyle}
         />
      </React.Fragment>
   );
};

Messages.propTypes = {};

export default Messages;
