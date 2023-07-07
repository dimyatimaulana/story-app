import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    content: { type: String, reflect: true },
    to: { type: String, reflect: true },
    iconClass: { type:String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <li class="nav-item py-2">
        <a class="nav-link text-white text-decoration-none" href="${this.to}">
          <i class=${this.iconClass}></i>
          <span class="fs-5 ms-3 d-none d-sm-inline">${this.content}</span>
        </a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);