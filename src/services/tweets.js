import api from '../utils/api';

/**
 * @function submitTweet
 * @param {content} content - The content and (optional) image to send to db
 * @returns {array} The tweet
 */

export const submitTweet = async (content) => {
  try {
    const res = await api.post('/api/tweets', content);

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

export const submitReply = async (id, content) => {
  try {
    const res = await api.post(`/api/tweets/comment/${id}`, content);
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
