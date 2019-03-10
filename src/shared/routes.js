import Home from '../browser/home';
import Careers from '../browser/careers';
import Contact from '../browser/contact';

const routes = [
  {
    component: Home,
    path: '/',
  },
  {
    component: Careers,
    path: '/careers',
    exact: true,
  },
  {
    component: Contact,
    path: '/contact',
    exact: true,
  },
];

export default routes;
