import Utils from '../../utils/utils';

const Profile = {
  async init() {
    await this._initialData();
    // this._initialListener();
  },

  async _initialData() {
    const user = Utils.getUserToken('user');
    // console.log(user);
    // const endpointUrl = 'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json'
    // let fetchResult;
    // try {
    //   const fetchRecords = await fetch(endpointUrl);
    //   const responseRecords = await fetchRecords.json();
    //   fetchResult = responseRecords;
    // } catch (err) {
    //   alert(err.message);
    // }

    // console.log(fetchResult);

    this._userProfile = user;
    this._populateUserProfileToCard(this._userProfile);
  },

  _populateUserProfileToCard(userData) {
    // if (!(typeof userData === 'object')) {
    //   throw new Error(
    //     `Parameter userData should be an object. The value is ${userData}`,
    //   );
    // }
    const userPhoto = document.querySelector('#userPhoto');
    const userName = document.querySelector('#userName');

    const btnEditUser = document.querySelector('#btnEditUser');
    btnEditUser.innerHTML = `
    <a class="btn bg-gradient text-capitalize" href="/profile/edit.html?id=${userData.id}">Edit User</a>
    `;

    userPhoto.setAttribute('src', 'https://source.unsplash.com/1200x700/?programming');
    userPhoto.setAttribute('alt', userData.name);
    userName.textContent = userData;
  },
};

export default Profile;
