import getParams from '../utils/getParams';
import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const ROOT_SELECTOR = '[data-js-slider]';

class Slider {
  selectors = {
    root: ROOT_SELECTOR,
    swiper: '[data-js-slider-swiper]',
    previousButton: 'data-js-slider-previous',
    nextButton: 'data-js-slider-next',
    pagination: 'data-js-slider-pagination',
  }

  defaultConfig = {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: "auto",
    speed: 500,
    spaceBetween: 40,
  }

  constructor(rootElement) {
    this.root = rootElement;
    this.swiper = this.root.querySelector(this.selectors.swiper);
    this.params = getParams(this.root, this.selectors.root);

    this.previousButton = this.getElement(this.selectors.previousButton);
    this.nextButton = this.getElement(this.selectors.nextButton);
    this.pagination = this.getElement(this.selectors.pagination);

    this.init();
  }

  getElement(attribute) {
    const selector = `[${attribute}=${this.swiper.dataset.jsSliderSwiper}]`;
    return document.querySelector(selector);
  }

  init() {
    // создаём Swiper с сохранением инстанса
    this.swiperInstance = new Swiper(this.swiper, {
      ...this.defaultConfig,
      ...this.params,
      navigation: {
        prevEl: this.previousButton,
        nextEl: this.nextButton,
      },
      pagination: {
        el: this.pagination,
        bulletClass: 'slider-pagination-bullet',
        bulletActiveClass: 'is-active',
        clickable: true
      }
    });

    // Пересчёт после полной загрузки страницы (когда clamp применён)
    window.addEventListener('load', () => this.swiperInstance.update());

    // Пересчёт при изменении размера окна
    window.addEventListener('resize', () => this.swiperInstance.update());
  }
}

class SliderCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(element => new Slider(element));
  }
}

export default SliderCollection;