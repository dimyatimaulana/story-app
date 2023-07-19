// Import our custom CSS
import '../sass/main.scss';

// import components
import './components/index';

//import js file as needed
import Dashboard from './pages/dashboard';
import AddStory from './pages/stories/add-story';
import DetailStory from './pages/stories/detail-story';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/edit';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/stories/add.html': AddStory,
  '/profile/profile.html': Profile,
  '/profile/edit.html': ProfileEdit,

  '/auth/login.html': Login,
  '/auth/register.html': Register,
}

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () =>{
  initPages();

  const route = detectRoute();
  route.init();
});