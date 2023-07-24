/* eslint-disable no-undef */
import Auth from '../../network/auth';
import CheckUserAuth from './check-auth-user';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
    this._checkVisibilityPassword();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const loadingContainer = document.querySelector('#loadingContainer');
        loadingContainer.innerHTML += this._spinnerLoading();
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        toastr.success(response.data.message);
        loadingContainer.innerHTML = '';
        window.setTimeout(() => this._goToLoginPage(), 5000);
      } catch (err) {
        const { message } = err.response.data;
        loadingContainer.innerHTML = '';
        toastr.error(message);
      }
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },

  _checkVisibilityPassword() {
    const button = document.querySelector('.input-group-text');
    const inputPw = document.querySelector('.input-group input');
    const eyeIcon = document.querySelector('#showHidePassword');

    button.addEventListener('click', () => {
      if (inputPw.type === 'password') {
        inputPw.type = 'text';
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
      } else if (inputPw.type === 'text') {
        inputPw.type = 'password';
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
      }
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
};

export default Register;
