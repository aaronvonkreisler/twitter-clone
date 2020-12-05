import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery, Avatar } from '@material-ui/core';
import './styles/UserMenu.css';

const UserMenu = ({ auth: { user, loading } }) => {
   const large = useMediaQuery('(min-width: 1920px)');
   return large ? (
      <div>Hi</div>
   ) : (
      <div className="user-menu__avatar">
         {!loading && user !== null && <Avatar src={user.avatar} />}
      </div>
   );
};

UserMenu.propTypes = {
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(UserMenu);
