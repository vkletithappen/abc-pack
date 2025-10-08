const playBtn = document.querySelector("[data-js-video-btn]");
const videoWrapper = document.querySelector("[data-js-video-wrapper]");

playBtn.addEventListener("click", () => {
  videoWrapper.classList.add('is-active');
  videoWrapper.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Видео о компании"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>`;
});