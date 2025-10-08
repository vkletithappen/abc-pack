const categories = [
  {
    name: "Картонные тубусы для упаковки",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "Зип лок пакеты оптом",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "Металлические крышки",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "Пакеты для фасовки",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "Стабило бэки",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "Упаковка для маркетплейсов",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
  {
    name: "В наличии",
    sub: [
      { name: "Матовые пакеты зип лок", url: "#" },
      { name: "Металлизированный пакет", url: "#" },
      { name: "Пакеты zip-lock с логотипом", url: "#" },
      { name: "Пакеты с бегунком и логотипом", url: "#" },
      { name: "Белый зип лок пакет матовый", url: "#" },
      { name: "Зип лок пакеты черные матовые", url: "#" },
      { name: "Пакеты зип лок с бегунком", url: "#" },
    ],
  },
];

const stack = [{ title: "Каталог", items: categories }];
const track = document.querySelector(".mobile-catalog__track");

function renderLevel(level) {
  const wrapper = document.createElement("div");
  wrapper.className = "mobile-catalog__level";

  wrapper.innerHTML = `
    <div class="mobile-catalog-header">
      ${stack.length > 1
      ? `<button class="btn-reset mobile-catalog-header__btn">${level.title}</button>`
      : '<span class="mobile-catalog-header__title">Каталог</span>'
    }
    </div>
    <div class="mobile-catalog__list">
      ${level.items
      .map((item, i) => {
        if (item.sub) {
          return `<div class="mobile-catalog__item" data-idx="${i}">${item.name}</div>`;
        } else {
          const url = item.url ? item.url : "#";
          return `<a href="${url}" class="mobile-catalog__item">${item.name}</a>`;
        }
      })
      .join("")}
    </div>
  `;

  if (stack.length > 1) {
    wrapper.querySelector(".mobile-catalog-header__btn").addEventListener("click", () => {
      stack.pop();
      slideTo(stack.length - 1, true);
    });
  }

  wrapper.querySelectorAll(".mobile-catalog__item[data-idx]").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = el.dataset.idx;
      const item = level.items[idx];
      if (item.sub) {
        stack.push({ title: item.name, items: item.sub });
        renderLevel(stack[stack.length - 1]);
        slideTo(stack.length - 1, false);
      }
    });
  });

  track.appendChild(wrapper);

  requestAnimationFrame(() => {
    wrapper.classList.add("active");
  });
}

function slideTo(index, isBack = false) {
  track.style.transform = `translateX(-${index * 100}%)`;

  if (isBack) {
    const levels = track.querySelectorAll(".mobile-catalog__level");
    if (levels.length > stack.length) {
      setTimeout(() => {
        levels[levels.length - 1].remove();
      }, 350);
    }
  }
}

renderLevel(stack[0]);
slideTo(0);