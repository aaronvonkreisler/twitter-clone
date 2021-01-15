import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import ProfileTabs from './ProfileTabs';
import Followers from './Followers';
import Following from './Following';
import Suggestions from './Suggestions';
import Spinner from '../layout/Spinner';
import {
   clearProfileDataState,
   getUserProfileData,
} from '../../actions/profileData';

const ProfileFollowing = ({
   profileData: { nameLoading, name },
   currentUser,
   clearProfileDataState,
   getUserProfileData,
}) => {
   const params = useParams();

   useEffect(() => {
      getUserProfileData(params.username);
   }, [getUserProfileData, params.username]);

   useEffect(() => {
      return function cleanUp() {
         clearProfileDataState();
      };
   }, [clearProfileDataState]);
   return (
      <React.Fragment>
         {currentUser == null || nameLoading ? (
            <Spinner />
         ) : (
            <React.Fragment>
               <Header leftIcon text={name} borderBottom={false} />
               <div>
                  <ProfileTabs
                     tab1Text="Followers"
                     tab2Text="Following"
                     tab3Text="Suggested"
                     tab1={<Followers authId={currentUser._id} />}
                     tab2={<Following authId={currentUser._id} />}
                     tab3={<Suggestions />}
                  />
               </div>
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

ProfileFollowing.propTypes = {
   clearProfileDataState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
   currentUser: state.auth.user,
});

export default connect(mapStateToProps, {
   clearProfileDataState,
   getUserProfileData,
})(ProfileFollowing);
