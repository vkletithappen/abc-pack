export function initHeaderHeightObserver() {
  const header = document.querySelector('header');
  if (!header) return;

  const updateHeaderHeight = () => {
    const height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  };

  window.addEventListener('load', updateHeaderHeight);

  window.addEventListener('resize', updateHeaderHeight);

  const resizeObserver = new ResizeObserver(updateHeaderHeight);
  resizeObserver.observe(header);

  return updateHeaderHeight;
}