import React, { Fragment, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import { CgClose } from 'react-icons/cg';
import {
   Grid,
   SearchBar,
   SearchContext,
   SearchContextManager,
   SuggestionBar,
} from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { closeGifModal } from '../../actions/modal';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Searchbar from '../layout/Searchbar';
import '../../styles/design/gifModal.css';

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY);

const GifComponents = () => {
   const { fetchGifs, searchKey } = useContext(SearchContext);

   const onGifClick = (gif, e) => {
      e.preventDefault();
      console.log(gif);
   };
   return (
      <Fragment>
         <SearchBar placeholder="Search for GIFs" />

         <Grid
            key={searchKey}
            columns={3}
            width={580}
            fetchGifs={fetchGifs}
            onGifClick={onGifClick}
         />
      </Fragment>
   );
};

const GifModal = ({ modal: { gifOpen }, closeGifModal }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const fullScreen = useMediaQuery('(max-width: 500px)');

   const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      console.log(searchTerm);
   };

   const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });

   const onGifClick = (gif, e) => {
      e.preventDefault();
      console.log(gif);
   };
   return (
      <Dialog
         open={gifOpen}
         onClose={() => closeGifModal()}
         fullWidth
         fullScreen={fullScreen}
         scroll="paper"
      >
         <Fragment>
            <div className="header">
               <div className="header-left">
                  <button
                     className="icon-button"
                     onClick={() => closeGifModal()}
                  >
                     <CgClose />
                  </button>
               </div>
               <div className="search">
                  <Searchbar
                     value={searchTerm}
                     onChange={handleInputChange}
                     placeholder="Search for GIFs"
                  />
               </div>
            </div>
            <div className="gif-body">
               {/*  <Grid
                  onGifClick={onGifClick}
                  fetchGifs={fetchGifs}
                  columns={3}
                  gutter={3}
                  width={580}
             />  */}

               <SearchContextManager apiKey={process.env.REACT_APP_GIPHY}>
                  <GifComponents />
               </SearchContextManager>
            </div>
         </Fragment>
      </Dialog>
   );
};

const mapStateToProps = (state) => ({
   modal: state.modal,
});

export default connect(mapStateToProps, { closeGifModal })(GifModal);
