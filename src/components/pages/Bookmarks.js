import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import { CgMore } from 'react-icons/cg';

const Bookmarks = (props) => {
   return (
      <div>
         <Header
            borderBottom
            text="Bookmarks"
            rightIcon
            IconComponent={CgMore}
            onRightIconClick={() => alert('Menu Goes here')}
         />
         <div className="feed"></div>
      </div>
   );
};

Bookmarks.propTypes = {};

export default Bookmarks;
