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
import Profile from './Profile';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileSubmitted from '../components/ProfileSubmitted/ProfileSubmitted';

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
  content: Profile,
  key: 'profile',
  icon: PersonOutlineIcon,
  // todo: change this
  enforceLogin: false,
},
];

const profileRoutes = [
  {
    label: 'Create Profile',
    path: '/login/create',
    content: CreateProfile,
    key: 'createProfile',
    icon: PersonOutlineIcon,
    enforceLogin: false,
    skipAppBar: true,
  }, {
    label: 'Profile Submitted',
    path: '/login/submitted',
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
  content: AddReview,
  key: 'addReview',
  // todo: change this
  enforceLogin: false,
  skipAppBar: true,
  exact: false,
}, {
  label: 'Add a space',
  path: '/new',
  content: AddSpace,
  key: 'addSpace',
  icon: AddCircleOutlineIcon,
  // todo: change this
  enforceLogin: false,
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
export { spaceRoutes, profileRoutes };
