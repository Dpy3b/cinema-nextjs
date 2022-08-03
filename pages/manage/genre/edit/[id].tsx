import GenreEdit from '@/components/screens/admin/genre/GenreEdit';
import { NextPageAuth } from '@/shared/types/auth.types';
import { FC } from 'react';

const GenreEditPage: NextPageAuth= () => {
  return <GenreEdit />;
}


GenreEditPage.isOnlyAdmin = true

export default GenreEditPage;
