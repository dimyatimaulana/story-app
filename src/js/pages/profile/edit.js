import Utils from '../../utils/utils';

const ProfileEdit = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const user = Utils.getUserToken('user');

    this._populateUserToForm(user);
  },

  _initialListener() {
    const editUserForm = document.querySelector('#editUserForm');
    editUserForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        editUserForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      // this._goToDashboardPage();
    }
  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomName');

    return {
      name: nameInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _getUserId() {
    const searchParamEdit = new URLSearchParams(window.location.search);
    return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },

  _populateUserToForm(user = null) {
    const nameInput = document.querySelector('#validationCustomName');

    nameInput.value = user;
  },
};

export default ProfileEdit;
