import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchUsers from './SearchUsers';
import SuggestedFollowCard from './SuggestedFollow';
import RelevantPeople from './RelevantPeople';
import '../../styles/design/widgetWrapper.css';
const WidgetWrapper = (props) => {
   let location = useLocation();
   const isStatusPageRendered = location.pathname.split('/')[2] === 'status';

   return (
      <div className="widget-wrapper">
         <SearchUsers />
         {isStatusPageRendered && <RelevantPeople />}
         <SuggestedFollowCard />
      </div>
   );
};

WidgetWrapper.propTypes = {};

export default WidgetWrapper;
