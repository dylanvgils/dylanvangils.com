import '@fortawesome/fontawesome-free/js/fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder, faFileLines, faPenToSquare, faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { faRss, faEnvelope, faTags, faCodeCommit, faBars, faSun, faMoon, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(
  // Regular
  faFolder,
  faFileLines,
  faPenToSquare,
  faFaceFrown,

  // Solid
  faRss,
  faEnvelope,
  faTags,
  faCodeCommit,
  faBars,
  faSun,
  faMoon,
  faInfoCircle,

  // Brands
  faGithub,
  faLinkedinIn);
