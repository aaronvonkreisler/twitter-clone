import api from '../utils/api';

export const searchUsers = async (searchTerm, offset = 0) => {
   try {
      const res = await api.get(`/api/user/${searchTerm}/${offset}/search`);
      return res.data;
   } catch (err) {
      console.warn(err);
   }
};
