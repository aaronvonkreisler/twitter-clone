import api from '../utils/api';

export const postMessage = async (content) => {
   try {
      const res = await api.post('/api/messages', content);
      return res.data;
   } catch (err) {
      throw new Error(err.message);
   }
};

export const fetchMessages = async (chatId) => {
   try {
      const res = await api.get(`/api/messages/${chatId}`);
      return res.data;
   } catch (err) {
      throw new Error(err.message);
   }
};
