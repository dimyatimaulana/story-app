import CheckUserAuth from '../pages/auth/check-auth-user';
import Stories from '../network/stories';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
  },

  async _initialData() {
    try {
      const response = await Stories.getAllStories();
      const stories = response.data.listStory;
      this._populateStoryList(stories);

    } catch (err) {
      toastr.error('Failed to fetch stories');
    }
  },

  _populateStoryList(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object.`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    const storyContainer = document.querySelector('#storyContainer');

    storyContainer.innerHTML = '';
    if (listStory.length <= 0 || listStory === null) {
      storyContainer.innerHTML = this._spinnerLoading();
      return;
    }

    listStory.forEach((item, idx) => {
      storyContainer.innerHTML += this._templateStoryList(listStory[idx]);
    });
  },

  _spinnerLoading() {
    return `
      <div class="container d-flex m-auto justify-content-between" style="max-width: 300px;">
        <div class="spinner-grow text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    `;
  },

  _templateStoryList(listStory) {
    const date = new Date(listStory.createdAt);
    return `
      <div class="d-flex flex-column flex-sm-row pb-2 mb-2 border-bottom border-color-dark">
        <div class="px-2">
          <img class="rounded-circle" src="${listStory.photoUrl}" alt="${
      listStory.name
    }" style="width: 40px; height:40px" />
        </div>
        <div class="px-2">
          <a href="/stories/id=${listStory.id}" style="text-decoration: none;"><p class="mb-0" style="font-weight: 600;">${listStory.name}</p></a>
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

  _templateEmptyStoryList() {
    return `
      <div>
        <p>Tidak ada story untuk ditampilkan</p>
      </div>
    `;
  },
};

export default Dashboard;
