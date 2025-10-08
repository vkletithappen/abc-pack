const categoryItems = document.querySelectorAll('[data-js-menu-category]');
const categoryContents = document.querySelectorAll('[data-js-menu-content]');

function activateCategory(item) {
  const category = item.dataset.category;

  categoryItems.forEach(i => i.classList.remove('active'));
  item.classList.add('active');

  categoryContents.forEach(content => {
    content.classList.toggle('active', content.dataset.category === category);
  });
}

categoryItems.forEach(item => {
  item.addEventListener('mouseenter', () => activateCategory(item));
});

if (categoryItems.length > 0) {
  activateCategory(categoryItems[0]);
}