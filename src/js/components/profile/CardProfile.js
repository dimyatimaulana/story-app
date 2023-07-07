import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class CardProfile extends LitWithoutShadowDom {
  static properties = {
    classes: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.classes = '';
  }

  render() {
    return html`
      <div class="card ${this.classes}">
        <div class="card-body">
          <div class="mb-3 text-center">
            <img src="" id="userPhoto" class="img-fluid rounded-circle" alt="user-profile" style="width: 200px; height: 200px;" />
          </div>
          <div class="text-center">
            <h5 id="userName" class="mt-2 mb-0"></h5>
            <span id="userEmail"></span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-profile', CardProfile);
