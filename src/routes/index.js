import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { withAuthenticationRequired } from '@auth0/auth0-react';
import Home from './Home';
import Search from './Search';
import AddSpace from './AddSpace';
import AddReview from './AddReview';
import SpaceDetails from './SpaceDetails';
import Reviews from './Reviews';

const ProtectedRoute = (component) => withAuthenticationRequired(component, {
  // eslint-disable-next-line react/react-in-jsx-scope
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});

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
  label: 'Profile',
  path: '/profile',
  // todo: change this/
  content: Home,
  key: 'profile',
  icon: PersonOutlineIcon,
  // todo: change this
  enforceLogin: false,
}];

const spaceRoutes = [{
  label: 'Add Review',
  path: '/:spaceId/reviews/new',
  // todo: change this/
  content: ProtectedRoute(AddReview),
  key: 'addReview',
  // todo: change this
  enforceLogin: false,
  skipAppBar: true,
  exact: false,
}, {
  label: 'Add a space',
  path: '/new',
  content: ProtectedRoute(AddSpace),
  key: 'addSpace',
  icon: AddCircleOutlineIcon,
  // todo: change this
  enforceLogin: true,
}, {
  label: 'Space Details',
  path: '/:spaceId',
  content: SpaceDetails,
  key: 'spaceDetails',
  skipAppBar: true,
  enforceLogin: false,
  /* TODO: check on this
   exact: true */
},
{
  label: 'Reviews',
  path: '/:spaceId/reviews',
  content: Reviews,
  key: 'reviews',
  skipAppBar: true,
  enforceLogin: false,
},
];

export default routes;
export { spaceRoutes };
