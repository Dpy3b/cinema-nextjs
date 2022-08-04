import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';



import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from '@/config/url.config';
import { useDebounce } from '@/hooks/useDebounce';
import { MovieService } from '@/services/movie.service';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { getGenresList, getGenresListEach } from '@/utils/movie/getGenresList';
import { toastError } from '@/utils/toast-error';


export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['search movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [movie.title, getGenresList(movie.genres), String(movie.rating)],
					})
				),
			//enabled: !!debouncedSearch,
			onError: error => {
				toastError(error, 'Movie list');
			},
		}
	);
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const {push} = useRouter()


	const { mutateAsync: createAsync } = useMutation(
		['create movie', debouncedSearch],
		() => MovieService.create(),
		{
			onSuccess({ data: _id }) {
				toastr.success('Create movie', 'Create was successful');
				//	queryData.refetch(); // обновляем данные, получаем по сути их без удаленного юзера
				push(getAdminUrl(`movie/edit/${_id}`));
			},
			onError: error => {
				toastError(error, 'Create movie');
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['delete movie', debouncedSearch],
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onSuccess() {
				toastr.success('Delete movie', 'Delete was successful');
				queryData.refetch(); // обновляем данные, получаем по сути их без удаленного юзера
			},
			onError: error => {
				toastError(error, 'Delete movie');
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};