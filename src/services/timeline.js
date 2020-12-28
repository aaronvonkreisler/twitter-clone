import api from '../utils/api';

/**
 * @function retrieveTimelineTweets
 * @param {number} offset - The offset of tweets to retrieve, or the number to skip.
 * @returns {array} Array of tweets
 */

export const retrieveTimelineTweets = async (offset = 0) => {
   try {
      const res = await api.get(`/api/tweets/timeline/${offset}`);

      return res.data;
   } catch (err) {
      throw new Error(err.response.data);
   }
};
