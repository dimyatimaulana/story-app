import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class StoryCard extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    date: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.name = '';
    this.description = '';
    this.date = '';
    this.photoUrl = '';
  }

  render() {
    return html`
      <div id="storyContainer" class="container" style="max-width: 100vw;">
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
