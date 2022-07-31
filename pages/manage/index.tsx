import Admin from '@/screens/admin/home/Admin';
import { NextPageAuth } from '@/shared/types/auth.types';
import { NextPage } from 'next';
import { FC } from 'react';

const AdminPage: NextPageAuth = () => {
  return <Admin />;
}

AdminPage.isOnlyAdmin = true

export default AdminPage;
