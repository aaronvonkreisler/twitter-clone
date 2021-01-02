import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchUsers from './SearchUsers';
import SuggestedFollowCard from './SuggestedFollow';
import RelevantPeople from './RelevantPeople';

const WidgetWrapper = (props) => {
   let location = useLocation();
   const isStatusPageRendered = location.pathname.split('/')[2] === 'status';
   console.log(isStatusPageRendered);
   return (
      <div>
         <SearchUsers />
         {isStatusPageRendered && <RelevantPeople />}
         <SuggestedFollowCard />
      </div>
   );
};

WidgetWrapper.propTypes = {};

export default WidgetWrapper;
