import CheckUserAuth from '../auth/check-auth-user';
import Stories from '../../network/stories';

const AddStory = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const addForm = document.querySelector('#addStory');
    addForm.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        addForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const response = await Stories.addNewStory(formData);
        toastr.success(response.data.message);

        window.setTimeout(() => this._goToDashboardPage(), 5000);
      } catch (err) {
        const message = err.response.data.message;
        toastr.error(message);
      }
    }
  },

  _getFormData() {
    const descInput = document.querySelector('#validationCustomDesc');
    const photoInput = document.querySelector('#validationPhoto');

    return {
      description: descInput.value,
      photo: photoInput.files[0],
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default AddStory;
