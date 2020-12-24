import api from './api';

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

         return response.data;
      } else {
         return;
      }
   } catch (err) {
      throw new Error(err.response.data.error);
   }
};
