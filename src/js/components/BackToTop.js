class BackToTop {
  constructor(selector = '[data-js-btn-to-top]', showScroll = 700, minWidth = 1200) {
    this.btn = document.querySelector(selector);
    this.SHOW_SCROLL = showScroll;
    this.MIN_WIDTH = minWidth;
    this.ticking = false;

    if (!this.btn) return;

    this.bindEvents();
    this.toggleBtn();
  }

  toggleBtn() {
    const shouldShow =
      window.scrollY >= this.SHOW_SCROLL && window.innerWidth >= this.MIN_WIDTH;
    this.btn.classList.toggle('is-visible', shouldShow);
  }

  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.toggleBtn();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  onResize() {
    this.toggleBtn();
  }

  onClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.btn.classList.remove('is-visible');
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
    this.btn.addEventListener('click', () => this.onClick());
  }
}

export default BackToTop;
