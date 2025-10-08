import { initHeaderHeightObserver } from '../utils/initHeaderHeightObserver';

const catalogToggles = document.querySelectorAll('[data-js-catalog-toggle]');
const catalogMenu = document.querySelector('.catalog-menu');
const body = document.body;

const updateHeaderHeight = initHeaderHeightObserver();

function toggleCatalogMenu() {
  if (updateHeaderHeight) updateHeaderHeight();

  catalogMenu.classList.toggle('active');
  body.classList.toggle('scroll-lock');

  catalogToggles.forEach(btn =>
    btn.classList.toggle('active', catalogMenu.classList.contains('active'))
  );
}

catalogToggles.forEach(btn => btn.addEventListener('click', toggleCatalogMenu));

document.addEventListener('click', e => {
  if (
    catalogMenu.classList.contains('active') &&
    !catalogMenu.contains(e.target) &&
    !e.target.closest('[data-js-catalog-toggle]')
  ) {
    toggleCatalogMenu();
  }
});