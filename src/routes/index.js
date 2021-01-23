import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Home from './Home';
import Search from './Search';
import AddSpace from './AddSpace';

const routes = [{
  label: 'Home',
  path: '/',
  content: Home,
  key: 'home',
  icon: HomeIcon,
  enforceLogin: false,
}, {
  label: 'Search for a space',
  path: '/search',
  content: Search,
  key: 'search',
  icon: SearchIcon,
  enforceLogin: false,
}, {
  label: 'Add a space',
  path: '/space/new',
  content: AddSpace,
  key: 'addSpace',
  icon: AddCircleOutlineIcon,
  // todo: change this
  enforceLogin: false,
}, {
  label: 'Profile',
  path: '/profile',
  // todo: change this/
  content: Home,
  key: 'profile',
  icon: PersonOutlineIcon,
  // todo: change this
  enforceLogin: false,
}];

export default routes;
export { Home, Search };
