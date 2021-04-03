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
  prefix: '',
}, {
  label: 'Search For A Space',
  path: '/search',
  content: Search,
  key: 'search',
  icon: SearchIcon,
  prefix: '',
}, {
  label: 'Search Results Page',
  path: '/search/results',
  content: Search,
  key: 'searchResults',
  icon: SearchIcon,
  prefix: '',
  enforceLogin: false,
  skipAppBar: true,
}, {
  label: 'Profile',
  path: '/profile',
  content: Profile,
  key: 'profile',
  icon: PersonOutlineIcon,
  prefix: '',
}, {
  label: 'Create Profile',
  path: '/users/new',
  content: CreateProfile,
  key: 'createProfile',
  icon: PersonOutlineIcon,
  prefix: '',
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
  prefix: '',
  enforceLogin: false,
  skipAppBar: true,
}];

const spaceRoutes = [{
  label: 'Add Review',
  path: '/:spaceId/reviews/new',
  content: ProtectedRoute(AddReview),
  key: 'addReview',
  skipAppBar: true,
  exact: false,
  prefix: '/spaces',
}, {
  label: 'Add A Space',
  path: '/new',
  content: ProtectedRoute(AddSpace),
  key: 'addSpace',
  icon: AddCircleOutlineIcon,
  prefix: '/spaces',
}, {
  label: 'Space Details',
  path: '/:spaceId',
  content: SpaceDetails,
  key: 'spaceDetails',
  skipAppBar: true,
  prefix: '/spaces',
  /* TODO: check on this
   exact: true */
},
{
  label: 'Reviews',
  path: '/:spaceId/reviews',
  content: Reviews,
  key: 'reviews',
  skipAppBar: true,
  prefix: '/spaces',
},
];

export default routes;
export { spaceRoutes };
