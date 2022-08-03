import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { Meta } from '@/utils/meta/Meta';
import { FC } from 'react';
import { useMovies} from './useMovies';

const MovieList: FC = () => {
  const {handleSearch, isLoading, searchTerm, data, deleteAsync} = useMovies()



  return <Meta title='Movies'>
    <AdminNavigation />
    <Heading title='Movies'/>
    <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
    <AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genre', 'Rating']}
				tableItems={data || []}
			/> {/* шаблон для разных сущностей */}
  </Meta>;
}

export default MovieList;
