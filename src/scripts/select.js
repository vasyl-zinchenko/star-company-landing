/* eslint-disable no-tabs */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import styles from './selectStyles';

let isOpenedSelectBox = false;

function openList(elements, arrow) {
  isOpenedSelectBox = !isOpenedSelectBox;

  elements.forEach((el) => {
    if (isOpenedSelectBox) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }

    if (isOpenedSelectBox) {
      arrow.style.transform = 'rotate(180deg)';
    } else {
      arrow.style.transform = 'rotate(0deg)';
    }
  });
}

class SelectList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['items', 'type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'items') {
      if (JSON.parse(newValue)[0] === 'age') {
        this._items = [...Array(82).keys()].map((i) => i + 18);
      } else {
        this._items = JSON.parse(newValue);
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    const inititalOptions = [
      ...this.shadowRoot.querySelectorAll('.select__option'),
    ].slice(1);
    const arrow = this.shadowRoot.querySelector('.select__arrow');
    const selectedElement = this.shadowRoot.querySelectorAll('.select__option')[0];
    let currentEl;

    selectedElement.addEventListener('click', () => {
      openList(inititalOptions, arrow);
    });

    inititalOptions.forEach((el, index, arr) => {
      el.addEventListener('click', () => {
        openList(inititalOptions, arrow);
        const currentOption = el.textContent;

        selectedElement.textContent = currentOption;

        currentEl = inititalOptions.find(
          (elem) => elem.textContent === selectedElement.textContent,
        );

        arr.forEach((elem) => {
          elem.removeAttribute('style');
        });

        if (currentEl.textContent === selectedElement.textContent) {
          currentEl.style.backgroundColor = 'grey';
          currentEl.style.color = 'white';
        }
      });
    });
  }

  render() {
    if (this._items && Array.isArray(this._items)) {
      this.shadowRoot.innerHTML = `
			${styles}

					<span class="select__arrow"></span>
					<div class="select__body">
						<div class="select__option">${this._items[0]}</div>
					
					${this._items
    .map(
      (item) => `
							<div class="select__option">${item}</div>
					`,
    )
    .join('')}
					</div>
      `;
    } else {
      this.shadowRoot.innerHTML = '';
    }
  }
}

customElements.define('select-list', SelectList);
