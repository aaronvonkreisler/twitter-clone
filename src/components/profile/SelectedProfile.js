import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserByUsername } from '../../actions/profile';
import Header from '../layout/Header';
import Spinner from '../layout/Spinner';

const SelectedProfile = ({
   getUserByUsername,
   match,
   profiles: { profile, loading },
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
               <div className="feed" />
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
});

export default connect(mapStateToProps, { getUserByUsername })(SelectedProfile);
