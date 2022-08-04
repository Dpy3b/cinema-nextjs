import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';



import { IActorEditInput } from './actor-edit.interface';
import { getAdminUrl } from '@/config/url.config';
import { ActorService } from '@/services/actor.service';
import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';


export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter();

	const actorId = String(query.id); // даже если будет андефайнед ошибки не будет

	const { isLoading } = useQuery(['actor by id', actorId], () => ActorService.getById(actorId), {
		onSuccess({ data }) {
			getKeys(data).forEach(key => {
				setValue(key, data[key]);
			});
		},
		// выше крутой лайфхак с помощбю обычного форича чтобы не городить кучу строк если у нас много полей

		onError(err) {
			toastError(err, 'Get actor');
		},
		enabled: !!query.id, // сработает только в случае если у нас есть квери айди, крч анти-андефайнед штука
	});

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onSuccess() {
				toastr.success('Update actor', 'update has successful');
				push(getAdminUrl('actors'));
			},

			onError(err) {
				toastError(err, 'Update actor');
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};