import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';



import { IMovieEditInput } from './movie-edit.interface';
import { getAdminUrl } from '@/config/url.config';
import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';
import { MovieService } from '@/services/movie.service';


export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter();

	const movieId = String(query.id); // даже если будет андефайнед ошибки не будет

	const { isLoading } = useQuery(['movie by id', movieId], () => MovieService.getById(movieId), {
		onSuccess({ data }) {
			getKeys(data).forEach(key => {
				setValue(key, data[key]);
			});
		},
		// выше крутой лайфхак с помощбю обычного форича чтобы не городить кучу строк если у нас много полей

		onError(err) {
			toastError(err, 'Get movie');
		},
		enabled: !!query.id, // сработает только в случае если у нас есть квери айди, крч анти-андефайнед штука
	});

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onSuccess() {
				toastr.success('Update movie', 'update has successful');
				push(getAdminUrl('movies'));
			},

			onError(err) {
				toastError(err, 'Update movie');
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};