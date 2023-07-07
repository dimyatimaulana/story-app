import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Atribut "brandName" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
        <div class="bg-dark p-2 p-md-4">
          <a class="d-flex text-decoration-none text-white">
            <span class="fs-4 d-none d-sm-inline">${this.brandName}</span>
          </a>
          <nav-links>
        </div>
    `;
  }
}

customElements.define('nav-app', NavApp);
