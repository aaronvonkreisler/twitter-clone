import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCurrentUsersProfile } from '../../actions/profile';
import Sidebar from '../sidebar/Sidebar';
import Widgets from '../widgets/Widgets';
import '../../styles/design/main.css';

const Main = ({ children, loadUser, getCurrentUsersProfile }) => {
   useEffect(() => {
      getCurrentUsersProfile();
   }, [loadUser, getCurrentUsersProfile]);
   return (
      <div className="main-grid">
         <nav className="main-nav">
            <Sidebar />
         </nav>
         <main className="main-content">{children}</main>
         <aside className="main-side">
            {/* Widgets go here and search bar*/}
         </aside>
      </div>
   );
};

export default connect(null, { getCurrentUsersProfile })(Main);
