import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getCurrentUsersProfile } from '../../actions/profile';
import Sidebar from '../sidebar/Sidebar';
import WidgetWrapper from '../widgets/WidgetWrapper';
import ComposeModal from '../forms/ComposeModal';
import '../../styles/design/main.css';

const Main = ({ children, loadUser, getCurrentUsersProfile }) => {
   const [modalOpen, setModalOpen] = useState(false);

   useEffect(() => {
      getCurrentUsersProfile();
   }, [loadUser, getCurrentUsersProfile]);
   return (
      <React.Fragment>
         <ComposeModal open={modalOpen} setOpen={setModalOpen} />
         <div className="main-grid">
            <nav className="main-nav">
               <Sidebar setModalOpen={setModalOpen} />
            </nav>
            <main className="main-content">{children}</main>
            <aside className="main-side">
               <WidgetWrapper />
            </aside>
         </div>
      </React.Fragment>
   );
};

export default connect(null, { getCurrentUsersProfile })(Main);
