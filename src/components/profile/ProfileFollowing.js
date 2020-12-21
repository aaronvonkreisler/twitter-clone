import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import ProfileTabs from './ProfileTabs';
import Followers from './Followers';
import Following from './Following';
import { clearProfileDataState } from '../../actions/profileData';

const ProfileFollowing = ({
   profileData: { nameLoading, name },
   clearProfileDataState,
}) => {
   useEffect(() => {
      return function cleanUp() {
         clearProfileDataState();
      };
   }, [clearProfileDataState]);
   return (
      <React.Fragment>
         <Header leftIcon text={!nameLoading && name} borderBottom={false} />
         <div>
            <ProfileTabs
               tab1Text="Followers"
               tab2Text="Following"
               tab3Text="Suggested"
               tab1={<Followers />}
               tab2={<Following />}
            />
         </div>
      </React.Fragment>
   );
};

ProfileFollowing.propTypes = {
   clearProfileDataState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { clearProfileDataState })(
   ProfileFollowing
);
