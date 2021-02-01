import api from './api';
import store from '../store/store';
import { PHOTO_UPLOAD_ERROR, PHOTO_UPLOAD_SUCCESS } from '../actions/types';
import { setAlert } from '../actions/alerts';

export const getBase64 = (file) => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });
};

export const uploadPhotoForTweet = async (file) => {
   try {
      if (file !== null) {
         const formData = new FormData();
         formData.append('image', file);

         const response = await api.post('api/tweets/image', formData);
         store.dispatch({ type: PHOTO_UPLOAD_SUCCESS });
         return response.data;
      } else {
         return;
      }
   } catch (err) {
      store.dispatch({
         type: PHOTO_UPLOAD_ERROR,
         payload: err.respose.data.error,
      });
      store.dispatch(setAlert('Photo upload unsuccessful.', 'info'));
   }
};

export const validateImage = async (file, errorCallback) => {
   const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)|(image\/gif)/i;

   if (file !== undefined) {
      if (file.type.match(regex)) {
         const base64 = await getBase64(file);
         return base64;
      } else {
         errorCallback();
      }
   }
};
