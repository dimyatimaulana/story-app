import Config from '../config/config';

const ApiEndpoint = {
    REGISTER: `${Config.BASE_URL}/register`,
    LOGIN: `${Config.BASE_URL}/login`,

    GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
    ADD_NEW_STORY: `${Config.BASE_URL}/stories`,
    ADD_NEW_STORY_GUEST: `${Config.BASE_URL}/stories/guest`,
    DETAIL_STORY: (id) => `${Config.BASE_URL}/stories/${id}`,
};

export default ApiEndpoint;