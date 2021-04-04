import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import withUser from '../AuthenticatedRoute';

const Profile = () => <ProfilePage />;

export default withUser(Profile);
