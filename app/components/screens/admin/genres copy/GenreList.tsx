import { FC } from 'react';

import { useGenres } from './useGenres';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { Meta } from '@/utils/meta/Meta';

const GenreList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useGenres();

	return (
		<Meta title='Genres'>
			<AdminNavigation />
			<Heading title='Genres' />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Genre', 'Slug', '']}
				tableItems={data || []}
			/>{' '}
			{/* шаблон для разных сущностей */}
		</Meta>
	);
};

export default GenreList;
