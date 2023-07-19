import Auth from '../../network/auth';
import Config from '../../config/config';
import Utils from '../../utils/utils';
import CheckUserAuth from './check-auth-user';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
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
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        Utils.setUserToken('user', response.data.loginResult.name);

        toastr.success(`${response.data.loginResult.name} login ${response.data.message}`);
        window.setTimeout(() => this._goToHomePage(), 5000);
      } catch (err) {
        const message = err.response.data.message;
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
};

export default Login;
