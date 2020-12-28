import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';
import { removeAllBookmarks } from '../../actions/bookmarks';

const BoomarksMenu = ({
  anchorEl,
  setAnchorEl,
  onClose,
  removeAllBookmarks,
}) => {
  const open = Boolean(anchorEl);
  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          style={{ color: 'rgb(224, 36, 94)' }}
          onClick={() => removeAllBookmarks()}
        >
          Clear all Bookmarks
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

BoomarksMenu.propTypes = {
  removeAllBookmarks: PropTypes.func.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};

export default connect(null, { removeAllBookmarks })(BoomarksMenu);
