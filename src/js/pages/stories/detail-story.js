import CheckUserAuth from '../auth/check-auth-user';
import Stories from '../../network/stories';

const DetailStory = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialData();
  },

  async _initialData() {
    const storyId = this._getStoryId();
    const detailContainer = document.querySelector('#detailContainer');
    try {
      const response = await Stories.getDetailStory(storyId);
      const story = response.data.listStory;

      detailContainer.innerHTML += this._templateStory(story);
    } catch (err) {
      console.log(err);
    }
  },

  _templateStory(listStory) {
    const date = new Date(listStory.createdAt);
    return `
      <div class="d-flex flex-column flex-sm-row pb-2 mb-2 border-bottom border-color-dark">
        <div class="px-2">
          <img class="rounded-circle" src="${listStory.photoUrl}" alt="${
      listStory.name
    }" style="width: 40px; height:40px" />
        </div>
        <div class="px-2">
          <a href="/stories/${listStory.id}"><p class="mb-0" style="font-weight: 600;">${
      listStory.name
    }</p></a>
          <p class="h-6">${listStory.description}</p>
          <div class="d-flex-col">
            <img style="max-width: 150px; height: auto;" id="cardStory" class="rounded-2 mb-1" src="${
              listStory.photoUrl
            }" alt="${listStory.name}" style="max-width: 600px; height:400px" />
            <div>
              <span>${date.getHours()}.${date.getMinutes()} · </span>
              <span>${date.toLocaleDateString('id')}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _getStoryId() {
    const searchParamEdit = new URLSearchParams(window.location.search);
    return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
  },
};

export default DetailStory;
