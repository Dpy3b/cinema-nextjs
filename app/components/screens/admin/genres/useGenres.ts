
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from '@/config/url.config';
import { useDebounce } from '@/hooks/useDebounce';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastError } from '@/utils/toast-error';
import { getGenresList, getGenresListEach } from '@/utils/movie/getGenresList';
import { GenreService } from '@/services/genre.service';

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['search genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			//enabled: !!debouncedSearch,
			onError: error => {
				toastError(error, 'Genre list');
			},
		}
	);
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		['delete genre', debouncedSearch],
		(genreId: string) => GenreService.deleteGenre(genreId),
		{

			onError: error => {
				toastError(error, 'Delete genre');
			},
			onSuccess() {
				toastr.success('Delete genre', 'Delete was successful');
				queryData.refetch(); // обновляем данные, получаем по сути их без удаленного юзера
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	);
};
