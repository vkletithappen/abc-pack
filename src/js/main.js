import Burger from './components/Burger';
import SliderCollection from './components/Slider';
import ScrollerCollection from './components/Scroller';
import TabsCollection from './components/Tabs';
import AccordionCollection from './components/Accordion';
import BackToTop from './components/BackToTop';
import MagicLine from './components/MagicLine';

import './components/youtubeVideo';
import './components/mobileCatalog';
import './components/menuCatalog';
import './components/desktopCatalog';

import '@/scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  new MagicLine('.nav');
  new Burger();
  new BackToTop();
  new SliderCollection();
  new ScrollerCollection();
  new TabsCollection();
  new AccordionCollection();
});
