import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfileFollowSuggestions } from '../../actions/profileData';
import Spinner from '../layout/Spinner';
import UserPreview from '../layout/UserPreview';

const Suggestions = ({
   getProfileFollowSuggestions,
   profileData: { suggestions, suggestionsLoading },
}) => {
   useEffect(() => {
      getProfileFollowSuggestions();
   }, [getProfileFollowSuggestions]);

   return (
      <Fragment>
         {suggestionsLoading && <Spinner />}
         {!suggestionsLoading &&
            suggestions.map((user) => (
               <UserPreview user={user} key={user._id} />
            ))}
      </Fragment>
   );
};

const mapStateToProps = (state) => ({
   profileData: state.profileData,
});

export default connect(mapStateToProps, { getProfileFollowSuggestions })(
   Suggestions
);
