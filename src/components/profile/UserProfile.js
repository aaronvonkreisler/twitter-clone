import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import '../../styles/design/profile.css';

const UserProfile = ({ auth: { loading, user } }) => {
   let history = useHistory();

   return (
      <React.Fragment>
         {loading || user === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header
                  leftIcon
                  onIconClick={() => history.goBack()}
                  text={user.name}
               />
               <div className="profileWrapper">
                  <div className="coverPhoto__container">
                     <div className="userImage__container">
                        <Avatar src={user.avatar} alt="User profile" />
                     </div>
                  </div>
                  <div className="feed" />
               </div>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profiles: state.profiles,
});
export default connect(mapStateToProps)(UserProfile);
