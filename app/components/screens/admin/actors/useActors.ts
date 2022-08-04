import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';



import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from '@/config/url.config';
import { useDebounce } from '@/hooks/useDebounce';
import { ActorService } from '@/services/actor.service';
import { GenreService } from '@/services/genre.service';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { getGenresList, getGenresListEach } from '@/utils/movie/getGenresList';
import { toastError } from '@/utils/toast-error';
import { useRouter } from 'next/router';


export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['search actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			//enabled: !!debouncedSearch,
			onError: error => {
				toastError(error, 'Actor list');
			},
		}
	);
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const {push} = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		['create actor', debouncedSearch],
		() => ActorService.create(),
		{
			onError: error => {
				toastError(error, 'Create actor');
			},
			onSuccess({ data: _id }) {
				toastr.success('Create actor', 'Create was successful');
				//	queryData.refetch(); // обновляем данные, получаем по сути их без удаленного юзера
				push(getAdminUrl(`actor/edit/${_id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['delete actor', debouncedSearch],
		(ActorId: string) => ActorService.deleteActor(ActorId),
		{
			onSuccess() {
				toastr.success('Delete actor', 'Delete was successful');
				queryData.refetch(); // обновляем данные, получаем по сути их без удаленного юзера
			},
			onError: error => {
				toastError(error, 'Delete actor');
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