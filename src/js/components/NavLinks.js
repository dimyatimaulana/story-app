import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  render() {
    return html`
      <ul class="nav nav-pills flex-column mt-4">
        <nav-link to="/" content="Home" iconClass="bi bi-house-fill fs-4"></nav-link>
        <nav-link to="/stories/add.html" content="Add Story" iconClass="bi bi-file-earmark-plus-fill fs-4"></nav-link>
        <nav-link to="/profile/profile.html" content="Profile" iconClass="bi bi-person-fill fs-4"></nav-link>
        <nav-link-auth to="/auth/login.html" content="Logout" iconClass="bi bi-box-arrow-in-right fs-4"></nav-link-auth>
      </ul>
    `
  }
}

customElements.define('nav-links', NavLinks);