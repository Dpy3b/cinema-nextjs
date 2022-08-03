
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
import { ActorService } from '@/services/actor.service';

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

	const { mutateAsync: deleteAsync } = useMutation(
		['delete actor', debouncedSearch],
		(ActorId: string) => ActorService.deleteActor(ActorId),
		{

			onError: error => {
				toastError(error, 'Delete actor');
			},
			onSuccess() {
				toastr.success('Delete actor', 'Delete was successful');
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
