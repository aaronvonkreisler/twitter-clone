import api from '../utils/api';

export const getCurrentUser = async () => {
   try {
      const res = await api.get('/api/user/current');
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const registerUser = async (formData) => {
   const res = await api.post('/auth/register', formData);
   return res.data;
};

export const signIn = async (loginInfo) => {
   const res = await api.post('/auth/signin', loginInfo);
   return res.data;
};
