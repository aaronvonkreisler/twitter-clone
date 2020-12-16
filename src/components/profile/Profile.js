import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../layout/Header';

const Profile = ({ match }) => {
   let history = useHistory();
   const username = match.params.username;

   // @TODO --------
   // Fetch profile by username and update state. Need to set
   // up a route in the back end to handle this.
   return (
      <React.Fragment>
         <Header leftIcon onIconClick={() => history.goBack()} text="test" />
         <div className="feed" />
      </React.Fragment>
   );
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});
export default connect(mapStateToProps)(Profile);
