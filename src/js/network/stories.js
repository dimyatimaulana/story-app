import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';
import ApiEndpoint from '../config/api_endpoint';

const instance = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  },
  timeout: 1000,
});

const Stories = {
  // async getAllStories() {
  //   return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //     },
  //   });
  // },

  async getAllStories() {
    return await instance({
      url: ApiEndpoint.GET_ALL_STORIES,
      method: "GET",
    });
  },

  async getDetailStory(id) {
    return await instance({
      url: ApiEndpoint.DETAIL_STORY(id),
      method: "GET",
    });
  },

  // async getDetailStory(id) {
  //   return await axios.get(ApiEndpoint.DETAIL_STORY(id), {
  //     headers: {
  //       Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
  //     },
  //   });
  // },

  async addNewStory({ description, photo }) {
    const data = { description, photo };

    return await axios.post(ApiEndpoint.ADD_NEW_STORY, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async addNewStoryGuest({ descriptions, photo }) {
    const data = { descriptions, photo };

    return await axios.post(ApiEndpoint.ADD_NEW_STORY_GUEST, data);
  }
}

export default Stories;