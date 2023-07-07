const ProfileEdit = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const userId = this._getUserId();

    if (!userId) {
      alert('User dengan id yang dicari tidak ditemukan');
      return;
    }

    const endpointUrl = 'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json'
    const fetchRecords = await fetch(endpointUrl);
    const responseRecords = await fetchRecords.json();
    const userProfile = responseRecords.listStory[0];

    // const dataRecord = userProfile.match((item) => item.id === userId);
;
    this._populateUserToForm(userProfile);
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

  _populateUserToForm(userRecord = null) {
    if (!(typeof userRecord === 'object')) {
      throw new Error(
        `Parameter userRecord should be an object. The value is ${userRecord}`,
      );
    }

    const nameInput = document.querySelector('#validationCustomName');

    nameInput.value = userRecord.name;
  },
};

export default ProfileEdit;
