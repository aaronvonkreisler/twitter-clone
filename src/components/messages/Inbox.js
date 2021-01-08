import React from 'react';
import PropTypes from 'prop-types';
import { FiMail } from 'react-icons/fi';
import Header from '../layout/Header';
import Searchbar from '../layout/Searchbar';
import '../../styles/design/inbox.css';

const Inbox = ({ setModalOpen }) => {
   const iconStyle = {
      fill: 'none',
   };
   return (
      <section>
         <Header
            text="Messages"
            rightIcon
            IconComponent={FiMail}
            overrideStyle={iconStyle}
            onRightIconClick={() => setModalOpen(true)}
         />
         <div className="inbox-search">
            <Searchbar placeholder="Search for people and groups" />
         </div>
      </section>
   );
};

Inbox.propTypes = {};

export default Inbox;
