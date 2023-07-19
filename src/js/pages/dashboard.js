import CheckUserAuth from '../pages/auth/check-auth-user';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
  },

  async _initialData() {
    const endpointUrl =
      'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json';
    let fetchResult;
    try {
      const fetchRecords = await fetch(endpointUrl);
      const responseRecords = await fetchRecords.json();
      fetchResult = responseRecords;
    } catch (err) {
      alert(err.message);
    }

    console.log(fetchResult);

    this._storyList = fetchResult.listStory;
    this._populateStoryList(this._storyList);
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
    if (listStory.length <= 0) {
      storyContainer.innerHTML = this._templateEmptyStoryList();
      return;
    }

    listStory.forEach((item, idx) => {
      storyContainer.innerHTML += this._templateStoryList(listStory[idx]);
    });
  },

  _templateStoryList(listStory) {
    const date = new Date(listStory.createdAt);
    return `
      <div class="d-flex pb-2 mb-2 border-bottom border-color-dark">
        <div class="px-2">
          <img class="rounded-circle" src="${listStory.photoUrl}" alt="${listStory.name}" style="width: 40px; height:40px" />
        </div>
        <div class="px-2">
          <p class="mb-0" style="font-weight: 600;">${listStory.name}</p>
          <p>${listStory.description}</p>
          <div class="d-flex-col">
            <img class="rounded-2 mb-1" src="${listStory.photoUrl}" alt="${listStory.name}" style="max-width: 600px; height:400px" />
            <div>
              <span>${date.getHours()}.${date.getMinutes()} · </span>
              <span>${date.toLocaleDateString("id")}</span>
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
