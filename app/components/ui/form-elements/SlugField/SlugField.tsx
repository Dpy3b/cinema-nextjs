import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import Field from '../Field';
import styles from './SlugField.module.scss'
interface ISlugField {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: () => void; // для генерации слага из тайтла
}

const SlugField: FC<ISlugField> = ({ error, generate, register }) => {
	return (
		<div className="relative">
			<Field
				{...register("slug", { required: "Slug is required!" })}
				placeholder="Slug"
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				Generate
			</div>
		</div>
	);
};

export default SlugField;
