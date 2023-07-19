import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputPasswordWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage2: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.type = 'text';
    this.required = false;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `Atribut "invalidFeedbackMessage" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <input
        id=${this.inputId || nothing}
        class="form-control"
        type=${this.type}
        value=${this.value || nothing}
        ?required=${this.required}
        @input=${(e) => {
          const pwInput = document.querySelector('#validationCustomPassword')
          this.value = e.target.value;
          if (this.value.length < 8) {
            this.invalidFeedbackMessage = this.invalidFeedbackMessage2;

            pwInput.classList.add('is-invalid');

            const invalidMsg = document.querySelector('.invalid-password');
            invalidMsg.classList.add('d-block');

          }
          if (this.value.length >= 8 || this.value == null || this.value == '') {
            const invalidMsg = document.querySelector('.invalid-password');
            invalidMsg.classList.remove('d-block');
          }
          if (this.value == '' || this.value == null) {
            this.invalidFeedbackMessage = 'Password required!';
            pwInput.classList.remove('is-invalid');
            pwInput.classList.add('is-valid');
          }
        }}
      />

      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback invalid-password">${this.invalidFeedbackMessage}</div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
    }

    return html``;
  }
}

customElements.define('input-password-with-validation', InputPasswordWithValidation);
