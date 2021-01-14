import api from '../utils/api';

export const fetchChats = async () => {
   try {
      const res = await api.get('/api/chats');

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

// Takes an array of UsreId's not including the requesting user.
export const createNewChat = async (users) => {
   try {
      const res = await api.post('/api/chats', users);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const getChatWithSpecificUser = async (userId) => {
   try {
      const res = await api.get(`/api/chats/user/${userId}`);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};
