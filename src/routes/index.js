import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Home from './Home';
import Search from './Search';
import AddSpace from './AddSpace';
import AddReview from './AddReview';
import SpaceDetails from './SpaceDetails';
import Reviews from './Reviews';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileSubmitted from '../components/ProfileSubmitted/ProfileSubmitted';

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
  label: 'Search results page',
  path: '/search/results',
  content: Search,
  key: 'searchResults',
  icon: SearchIcon,
  enforceLogin: false,
  skipAppBar: true,
}, {
  label: 'Profile',
  path: '/profile',
  content: Profile,
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
  // todo: change this
  enforceLogin: false,
}, {
  label: 'Profile Submitted',
  path: '/users/new/submitted',
  content: ProfileSubmitted,
  key: 'profileSubmitted',
  icon: PersonOutlineIcon,
  enforceLogin: false,
  skipAppBar: true,
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
