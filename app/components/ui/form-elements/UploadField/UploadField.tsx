import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import styles from '../Form.module.scss';
import { IUploadField } from '../form.interface';

import { useUpload } from './useUpload';
import SkeletonLoader from '../../heading/SkeletonLoader';

const UploadField: FC<IUploadField> = ({
	placeholder,
	image,
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
					<input type='file' onChange={uploadFile} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className='w-full h-full' />
						) : (
							image && <Image src={image} alt='' layout='fill' unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadField;
