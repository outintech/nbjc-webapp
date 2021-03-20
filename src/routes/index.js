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
import CreateProfile from './CreateProfile';

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
}, {
  label: 'Search for a space',
  path: '/search',
  content: Search,
  key: 'search',
  icon: SearchIcon,
}, {
  label: 'Profile',
  path: '/profile',
  // todo: change this/
  content: Home,
  key: 'profile',
  icon: PersonOutlineIcon,
}, {
  label: 'Create Profile',
  path: '/users/new',
  content: CreateProfile,
  key: 'createProfile',
  icon: PersonOutlineIcon,
  skipAppBar: true,
  exact: true,
}];

const spaceRoutes = [{
  label: 'Add Review',
  path: '/:spaceId/reviews/new',
  // todo: change this/
  content: ProtectedRoute(AddReview),
  key: 'addReview',
  skipAppBar: true,
  exact: false,
}, {
  label: 'Add a space',
  path: '/new',
  content: ProtectedRoute(AddSpace),
  key: 'addSpace',
  icon: AddCircleOutlineIcon,
}, {
  label: 'Space Details',
  path: '/:spaceId',
  content: SpaceDetails,
  key: 'spaceDetails',
  skipAppBar: true,
  /* TODO: check on this
   exact: true */
},
{
  label: 'Reviews',
  path: '/:spaceId/reviews',
  content: Reviews,
  key: 'reviews',
  skipAppBar: true,
},
];

export default routes;
export { spaceRoutes };
