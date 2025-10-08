class MagicLine {
  constructor(selector) {
    this.menu = document.querySelector(selector);

    if (!this.menu) return;

    this.menu.addEventListener('mouseover', (e) => this.handleMouseOver(e));
    this.menu.addEventListener('mouseleave', () => this.resetIndicator());
  }

  updateIndicator(linkElem) {
    const linkRect = linkElem.getBoundingClientRect();
    const style = getComputedStyle(linkElem);

    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);

    const width = linkRect.width - paddingLeft - paddingRight;
    const left = linkElem.offsetLeft + paddingLeft;

    this.menu.style.setProperty('--indicator-left', `${left}px`);
    this.menu.style.setProperty('--indicator-width', `${width}px`);
  }

  resetIndicator() {
    this.menu.style.setProperty('--indicator-left', 0);
    this.menu.style.setProperty('--indicator-width', 0);
  }

  handleMouseOver(e) {
    const link = e.target.closest('.nav__link');
    if (link) {
      this.updateIndicator(link);
    }
  }
}

export default MagicLine; 
