import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../layout/Header';

const Profile = () => {
   let history = useHistory();
   return (
      <React.Fragment>
         <Header leftIcon onIconClick={() => history.goBack()} text="test" />
         <div className="feed" />
      </React.Fragment>
   );
};

export default Profile;
