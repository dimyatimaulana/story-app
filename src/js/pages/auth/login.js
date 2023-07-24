/* eslint-disable no-undef */
import Auth from '../../network/auth';
import Config from '../../config/config';
import Utils from '../../utils/utils';
import CheckUserAuth from './check-auth-user';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();

    this._checkVisibilityPassword();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const loadingContainer = document.querySelector('#loadingContainer');
        loadingContainer.innerHTML += this._spinnerLoading();
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        Utils.setUserToken('user', response.data.loginResult.name);

        toastr.success(`${response.data.loginResult.name} login ${response.data.message}`);
        loadingContainer.innerHTML = '';
        window.setTimeout(() => this._goToHomePage(), 5000);
      } catch (err) {
        const { message } = err.response.data;
        loadingContainer.innerHTML = '';
        toastr.error(message);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToHomePage() {
    window.location.href = '/';
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

export default Login;
