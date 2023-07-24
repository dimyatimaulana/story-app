import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputGroupPassword extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    inputGroupText: { type: String, reflect: true },
    inputGroupIcon: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('type')) {
      throw new Error(`Atribut "type" harus diterapkan pada elemen ${this.localName}`);
    }

    if (!(this.hasAttribute('inputGroupText') || this.hasAttribute('inputGroupIcon'))) {
      throw new Error(
        `Salah satu dari atribut harus diterapkan pada elemen ${this.localName}: inputGroupText dan inputGroupIcon`,
      );
    }

    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `Atribut "invalidFeedbackMessage" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <div class="input-group has-validation">
        <input
          class="form-control"
          id=${this.inputId || nothing}
          type=${this.type}
          value=${this.value || nothing}
          ?required=${this.required}
        />
        <span class="input-group-text d-flex gap-2"><i id="showHidePassword" class="bi ${this.inputGroupIcon}"></i></span>

        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
      </div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validation) {
      if (this.validFeedbackMessage) {
        return html` <div class="valid-feedback">${this.validFeedbackMessage}</div> `;
      }
    }

    return html``;
  }
}

customElements.define('input-group-password', InputGroupPassword);
