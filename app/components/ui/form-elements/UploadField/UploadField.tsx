import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import SkeletonLoader from '../../heading/SkeletonLoader';
import styles from '../Form.module.scss';
import { IUploadField } from '../form.interface';

import { useUpload } from './useUpload';

const UploadField: FC<IUploadField> = ({
	placeholder,
	value,
	onChange,
	error,
	folder,
	style,
	isNoImage = false,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder);
	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type='file' name='image' onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className='w-full h-full' />
						) : (
							value && <Image src={value} alt='' layout='fill' unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadField;
