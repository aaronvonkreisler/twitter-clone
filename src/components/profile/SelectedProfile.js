import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import { getUserByUsername } from '../../actions/profile';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';
import '../../styles/design/profile.css';

const SelectedProfile = ({
   getUserByUsername,
   match,
   profiles: { profile, loading },
   auth,
}) => {
   let history = useHistory();

   useEffect(() => {
      getUserByUsername(match.params.username);
   }, [getUserByUsername, match.params.username]);
   return (
      <div>
         {loading || profile === null ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header
                  leftIcon
                  onIconClick={() => history.goBack()}
                  text={profile.name}
               />
               <div className="profileWrapper">
                  <div className="coverPhoto__container">
                     <div className="userImage__container">
                        <Avatar src={profile.avatar} alt="User profile" />
                     </div>
                  </div>
                  <div className="profileButtons__container">
                     {!auth.loading && auth.user._id !== profile._id && (
                        <Link to={`/messages/${profile._id}`}>
                           <FiMail />
                        </Link>
                     )}
                  </div>
                  <div className="feed" />
               </div>
            </React.Fragment>
         )}
      </div>
   );
};

SelectedProfile.propTypes = {
   getUserByUsername: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profiles: state.profiles,
   auth: state.auth,
});

export default connect(mapStateToProps, { getUserByUsername })(SelectedProfile);
