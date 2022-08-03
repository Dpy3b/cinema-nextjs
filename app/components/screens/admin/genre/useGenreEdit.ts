import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { IGenreEditInput } from './genre-edit.interface';
import { getAdminUrl } from '@/config/url.config';
import { GenreService } from '@/services/genre.service';
import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter();

	const genreId = String(query.id); // даже если будет андефайнед ошибки не будет

	const { isLoading } = useQuery(['genre by id', genreId], () => GenreService.getGenreById(genreId), {
		onSuccess({ data }) {
			getKeys(data).forEach(key => {
				setValue(key, data[key]);
			});
		},
		// выше крутой лайфхак с помощбю обычного форича чтобы не городить кучу строк если у нас много полей

		onError(err) {
			toastError(err, 'Get genre');
		},
		enabled: !!query.id, // сработает только в случае если у нас есть квери айди, крч анти-андефайнед штука
	});

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onSuccess() {
				toastr.success('Update genre', 'update has successful');
				push(getAdminUrl('genres'));
			},

			onError(err) {
				toastError(err, 'Update genre');
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
