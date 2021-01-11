import api from '../utils/api';

export const submitTweet = async (tweet) => {
   try {
      const res = await api.post('/api/tweets', tweet);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const fetchReplies = async (id) => {
   try {
      const res = await api.get(`/api/tweets/${id}/replies`);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const fetchTweet = async (id) => {
   try {
      const res = await api.get(`/api/tweets/${id}`);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const submitRetweet = async (id) => {
   try {
      const res = await api.post(`/api/tweets/${id}/retweet`);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const removeTweet = async (id) => {
   try {
      await api.delete(`/api/tweets/${id}`);
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const favorite = async (id) => {
   try {
      const res = await api.put(`/api/tweets/like/${id}`);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const unfavorite = async (id) => {
   try {
      const res = await api.put(`/api/tweets/unlike/${id}`);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const submitReply = async (id, reply) => {
   try {
      const res = await api.post(`/api/tweets/comment/${id}`, reply);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const pinTweet = async (id) => {
   try {
      const res = await api.put(`/api/tweets/pin-tweet/${id}`);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};

export const getLikedUsers = async (id) => {
   try {
      const res = await api.get(`/api/tweets/${id}/likes`);
      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};
