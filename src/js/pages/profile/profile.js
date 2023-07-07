const Profile = {
  async init() {
    await this._initialData();
    // this._initialListener();
  },

  async _initialData() {
    const endpointUrl = 'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json'
    let fetchResult;
    try {
      const fetchRecords = await fetch(endpointUrl);
      const responseRecords = await fetchRecords.json();
      fetchResult = responseRecords;
    } catch (err) {
      alert(err.message);
    }

    console.log(fetchResult);

    this._userProfile = fetchResult.listStory[0];
    this._populateUserProfileToCard(this._userProfile);
  },

  _populateUserProfileToCard(userData) {
    if (!(typeof userData === 'object')) {
      throw new Error(
        `Parameter userData should be an object. The value is ${userData}`,
      );
    }
    const userPhoto = document.querySelector('#userPhoto');
    const userName = document.querySelector('#userName');

    const btnEditUser = document.querySelector('#btnEditUser');
    btnEditUser.innerHTML = `
    <a class="btn btn-dark text-capitalize" href="/profile/edit.html?id=${
      userData.id
    }">Edit User</a>
    `

    userPhoto.setAttribute('src', userData.photoUrl);
    userPhoto.setAttribute('alt', userData.name);
    userName.textContent = userData.name;
  },
};

export default Profile;