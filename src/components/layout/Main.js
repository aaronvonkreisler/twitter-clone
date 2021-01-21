import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUsersProfile } from '../../actions/profile';
import { openMessageModal } from '../../actions/modal';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Sidebar from '../sidebar/Sidebar';
import WidgetWrapper from '../widgets/WidgetWrapper';
import ComposeModal from '../forms/ComposeModal';

import '../../styles/design/main.css';

const Main = ({
   children,
   loadUser,
   getCurrentUsersProfile,
   selectedChat,
   openMessageModal,
}) => {
   const [modalOpen, setModalOpen] = useState(false);
   let location = useLocation();

   const isMessagesPageRendered =
      location.pathname === '/messages' ||
      location.pathname.split('/')[1] === 'messages';

   const gridClassName = isMessagesPageRendered
      ? 'main-messages-grid'
      : 'main-grid';

   const mobileScreen = useMediaQuery('(max-width: 500px)');
   useEffect(() => {
      getCurrentUsersProfile();
   }, [loadUser, getCurrentUsersProfile]);
   return (
      <React.Fragment>
         <ComposeModal open={modalOpen} setOpen={setModalOpen} />
         <div className={gridClassName}>
            {mobileScreen &&
            selectedChat !== null &&
            isMessagesPageRendered ? null : (
               <nav className="main-nav">
                  <Sidebar
                     setModalOpen={setModalOpen}
                     withMessages={isMessagesPageRendered}
                     openMessageModal={openMessageModal}
                  />
               </nav>
            )}

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

const mapStateToProps = (state) => ({
   selectedChat: state.chats.selectedChat,
});

export default connect(mapStateToProps, {
   getCurrentUsersProfile,
   openMessageModal,
})(Main);
