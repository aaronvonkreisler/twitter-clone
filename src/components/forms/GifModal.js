import React, {
   Fragment,
   useState,
   useContext,
   useEffect,
   useCallback,
   useLayoutEffect,
   useRef,
} from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { CgClose } from 'react-icons/cg';
import {
   Grid,
   SearchBar,
   SearchContext,
   SearchContextManager,
} from '@giphy/react-components';

import { closeGifModal } from '../../actions/modal';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import '../../styles/design/gifModal.css';
import initialGifs from '../../gifs.json';

const GifComponents = ({ handleGifClick, closeGifModal }) => {
   const [showInitialGifs, setShowInitialGifs] = useState(initialGifs);
   const [width, setWidth] = useState(0);
   const { fetchGifs, searchKey, term } = useContext(SearchContext);
   const fullScreen = useMediaQuery('(max-width: 500px)');

   const modalRef = useRef();

   useLayoutEffect(() => {
      setWidth(modalRef.current.clientWidth);
   }, []);

   const handleResize = useCallback(() => {
      if (modalRef.current) {
         setWidth(modalRef.current.clientWidth);
      }

      console.log(modalRef.current);
      console.log(width);
   }, [width]);

   useEffect(() => {
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [handleResize]);

   useEffect(() => {
      if (showInitialGifs !== null) {
         setShowInitialGifs(null);
      }
   }, [term, showInitialGifs]);

   const onGifClick = (gif, e) => {
      e.preventDefault();
      handleGifClick(gif);
   };
   return (
      <Fragment>
         <div className="header">
            <div className="header-left">
               <button className="icon-button" onClick={() => closeGifModal()}>
                  <CgClose />
               </button>
            </div>

            <div className="search" onFocus={(e) => console.log(e.target)}>
               <SearchBar placeholder="Search for GIFs" />
            </div>
         </div>
         <div
            className="gif-body"
            style={fullScreen ? { height: '90vh' } : null}
            ref={modalRef}
         >
            <Grid
               key={searchKey}
               columns={3}
               width={width}
               fetchGifs={fetchGifs}
               onGifClick={onGifClick}
               initialGifs={showInitialGifs}
            />
         </div>
      </Fragment>
   );
};

const GifModal = ({ modal: { gifOpen }, closeGifModal, handleGifClick }) => {
   const fullScreen = useMediaQuery('(max-width: 500px)');
   return (
      <Dialog
         open={gifOpen}
         onClose={() => closeGifModal()}
         fullWidth
         fullScreen={fullScreen}
         scroll="body"
      >
         <Fragment>
            <SearchContextManager apiKey={process.env.REACT_APP_GIPHY}>
               <GifComponents
                  handleGifClick={handleGifClick}
                  closeGifModal={closeGifModal}
               />
            </SearchContextManager>
         </Fragment>
      </Dialog>
   );
};

const mapStateToProps = (state) => ({
   modal: state.modal,
});

export default connect(mapStateToProps, { closeGifModal })(GifModal);
