import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUsersProfile } from '../../actions/profile';
import Sidebar from '../sidebar/Sidebar';
import WidgetWrapper from '../widgets/WidgetWrapper';
import ComposeModal from '../forms/ComposeModal';
import MessagesPage from '../../pages/Messages';
import '../../styles/design/main.css';

const Main = ({ children, loadUser, getCurrentUsersProfile }) => {
   const [modalOpen, setModalOpen] = useState(false);
   let location = useLocation();
   const isMessagesPageRendered =
      location.pathname === '/messages' ||
      location.pathname.split('/')[1] === 'messages';
   const gridClassName = isMessagesPageRendered
      ? 'main-messages-grid'
      : 'main-grid';
   useEffect(() => {
      getCurrentUsersProfile();
   }, [loadUser, getCurrentUsersProfile]);
   return (
      <React.Fragment>
         <ComposeModal open={modalOpen} setOpen={setModalOpen} />
         <div className={gridClassName}>
            <nav className="main-nav">
               <Sidebar setModalOpen={setModalOpen} />
            </nav>
            <main className="main-content">{children}</main>
            {!isMessagesPageRendered && (
               <aside className="main-side">
                  <WidgetWrapper />
               </aside>
            )}
         </div>
      </React.Fragment>
   );
};

export default connect(null, { getCurrentUsersProfile })(Main);
