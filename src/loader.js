class Loader {
  constructor({ selector, disabled = false }) {
    this.btnEl = document.querySelector(selector);
    disabled ?? this.toggleDisable();
  }

  get btnRef() {
    return this.btnEl;
  }

  show() {
    this.btnRef.classList.remove('visually-hidden');
  }

  hide() {
    this.btnRef.classList.add('visually-hidden');
  }

  toggleDisable() {
    this.btnRef.toggleAttribute('disabled');
  }
}

export default Loader;
