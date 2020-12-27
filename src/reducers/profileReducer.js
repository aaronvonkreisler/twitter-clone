import {
  GET_CURRENT_USERS_PROFILE,
  PROFILE_ERROR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_COVER_PHOTO_SUCCESS,
  UPLOAD_PHOTO_ERROR,
  SELECTED_USER_LOADED,
  GET_PROFILE_TWEETS,
  GET_PROFILE_REPLIES,
  GET_PROFILE_LIKES,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CLEAR_PROFILE,
  GET_PINNED_TWEET,
  UPDATE_FAVORITES,
  RETWEET_SUCCESS,
  PIN_TWEET_TO_PROFILE,
  REMOVE_PINNED_TWEET,
  DELETE_TWEET,
  USER_LOADED,
  EDIT_PROFILE,
} from '../actions/types';

const initialState = {
  currentProfile: null,
  profile: null,
  isFollowing: false,
  isOwnProfile: false,
  followersCount: 0,
  followingCount: 0,
  tweets: [],
  tweetsLoading: true,
  likedTweets: [],
  likesLoading: true,
  replies: [],
  repliesLoading: true,
  pinnedTweet: null,
  pinnedTweetLoading: true,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USERS_PROFILE:
    case UPLOAD_AVATAR_SUCCESS:
    case UPLOAD_COVER_PHOTO_SUCCESS:
    case EDIT_PROFILE:
    case USER_LOADED:
      return {
        ...state,
        currentProfile: payload,
        loading: false,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followersCount: payload.length,
        isFollowing: true,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followersCount: payload.length,
        isFollowing: false,
      };
    case UPDATE_FAVORITES:
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet._id === payload.id
            ? {
                ...tweet,
                favorites: payload.favorites,
              }
            : tweet
        ),
      };
    case DELETE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((tweet) => tweet._id !== payload),
        replies: state.replies.filter((reply) => reply._id !== payload),
        likedTweets: state.likedTweets.filter((tweet) => tweet._id !== payload),
      };
    case RETWEET_SUCCESS:
      return {
        ...state,
        tweets: state.tweets.map((tweet) =>
          tweet._id === payload.id
            ? {
                ...tweet,
                retweetUsers: payload.users,
              }
            : tweet
        ),
      };
    case SELECTED_USER_LOADED:
      return {
        ...state,
        profile: payload.user,
        isFollowing: payload.isFollowing,
        isOwnProfile: payload.isOwnProfile,
        followersCount: payload.user.followers.length,
        followingCount: payload.user.following.length,
        tweetsReady: false,
      };
    case GET_PROFILE_TWEETS:
      return {
        ...state,
        tweets: payload,
        tweetsLoading: false,
      };
    case GET_PROFILE_REPLIES:
      return {
        ...state,
        replies: payload,
        repliesLoading: false,
      };
    case GET_PROFILE_LIKES:
      return {
        ...state,
        likedTweets: payload,
        likesLoading: false,
      };
    case GET_PINNED_TWEET:
    case PIN_TWEET_TO_PROFILE:
      return {
        ...state,
        pinnedTweet: payload,
        pinnedTweetLoading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        isFollowing: false,
        isOwnProfile: false,
        tweets: [],
        likedTweets: [],
        replies: [],
        pinnedTweet: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        currentProfile: null,
        profile: null,
        tweets: [],
        likedTweets: [],
        replies: [],
      };
    case UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        error: payload,
      };
    case REMOVE_PINNED_TWEET:
      return {
        ...state,
        pinnedTweet: null,
      };
    default:
      return state;
  }
}
