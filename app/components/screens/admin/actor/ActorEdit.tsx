import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import formStyles from '../../../ui/form-elements/admin-form.module.scss';

import { IActorEditInput } from './actor-edit.interface';
import { useActorEdit } from './useActorEdit';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Button from '@/components/ui/form-elements/Button';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import UploadFile from '@/components/ui/form-elements/UploadField/UploadFile';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import { Meta } from '@/utils/meta/Meta';
import generateSlug from '@/utils/string/generateSlug';

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useActorEdit(setValue);

	return (
		<Meta title='Edit actor'>
			<AdminNavigation />
			<Heading title='Edit actor' />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', { required: 'Name is required!' })}
								placeholder='Name'
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<SlugField
								error={errors.slug}
								register={register}
								generate={() => {
									setValue('slug', generateSlug(getValues('name')));
								}}
							/>

							<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadFile
									placeholder="Photo"
									error={error}
									folder="actors"
									value={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Photo is required!',
							}}
						/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
};
export default ActorEdit;
