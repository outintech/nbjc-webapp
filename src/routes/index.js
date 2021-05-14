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
import CommunityGuidelines from './CommunityGuidelines';
import TermsOfService from './TermsOfService';
import InfringementPolicies from './InfringementPolicies';

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
  skipAppBar: true,
}, {
  label: 'Profile',
  path: '/profile',
  content: ProtectedRoute(Profile),
  key: 'profile',
  icon: PersonOutlineIcon,
  prefix: '',
}, {
  label: 'Create Profile',
  path: '/users/new',
  content: ProtectedRoute(CreateProfile),
  key: 'createProfile',
  icon: PersonOutlineIcon,
  prefix: '',
  skipAppBar: true,
  exact: true,
},
{
  label: 'Profile Submitted',
  path: '/users/new/submitted',
  content: ProfileSubmitted,
  key: 'profileSubmitted',
  icon: PersonOutlineIcon,
  prefix: '',
  skipAppBar: true,
},
{
  label: 'Community Guidelines',
  path: '/community-guidelines',
  content: CommunityGuidelines,
  key: 'communityGuidelines',
  skipAppBar: true,
  prefix: '',
},
{
  label: 'Terms of Service',
  path: '/terms-of-service',
  content: TermsOfService,
  key: 'termsOfService',
  skipAppBar: true,
  prefix: '',
},
{
  label: 'Infringement Policies',
  path: '/infringement-policies',
  content: InfringementPolicies,
  key: 'infringementPolicies',
  skipAppBar: true,
  prefix: '',
},
];

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
