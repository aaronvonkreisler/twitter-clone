import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar';
import SuggestedFollowCard from './SuggestedFollow';
import RelevantPeople from './RelevantPeople';
const WidgetWrapper = (props) => {
   let location = useLocation();
   const isStatusPageRendered = location.pathname.split('/')[2] === 'status';
   console.log(isStatusPageRendered);
   return (
      <div>
         <Searchbar />
         {isStatusPageRendered && <RelevantPeople />}
         <SuggestedFollowCard />
      </div>
   );
};

WidgetWrapper.propTypes = {};

export default WidgetWrapper;
