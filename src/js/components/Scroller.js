const ROOT_SELECTOR = '[data-js-scroller]';

class Scroller {
  selectors = {
    root: ROOT_SELECTOR,
    scrollerInner: '[data-js-scroller-inner]'
  }

  stateAtrributes = {
    ariaHidden: 'aria-hidden'
  }

  constructor(rootElement) {
    this.root = rootElement;
    this.rootInner = this.root.querySelector(this.selectors.scrollerInner);
    this.init();
  }

  init() {
    const copyOfItems = [...this.rootInner.children]
    copyOfItems.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute(this.stateAtrributes.ariaHidden, true);
      this.rootInner.append(duplicatedItem);
    })
  }
}

class ScrollerCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(element => new Scroller(element));
  }
}

export default ScrollerCollection;
