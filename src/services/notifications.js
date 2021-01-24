import api from '../utils/api';

export const fetchAllNotifications = async () => {
   try {
      const res = await api.get('/api/notifications');
      return res.data;
   } catch (err) {
      throw new Error(err.message);
   }
};
