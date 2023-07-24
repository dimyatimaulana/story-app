import Utils from '../../utils/utils';

const Profile = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const user = Utils.getUserToken('user');
    this._userProfile = user;
    this._populateUserProfileToCard(this._userProfile);
  },

  _populateUserProfileToCard(userData) {
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
