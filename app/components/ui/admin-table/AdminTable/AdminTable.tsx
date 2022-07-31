import { FC } from 'react';

import SkeletonLoader from '../../heading/SkeletonLoader';

import { ITableItem } from './admin-table.interface';
import styles from './AdminTable.module.scss';
import AdminTableHeader from './AdminTableHeader';
import AdminTableItem from './AdminTableItem';

interface IAdminTable {
	tableItems: ITableItem[];
	isLoading: boolean;
	headerItems: string[];
	removeHandler: (id: string) => void;
}

const AdminTable: FC<IAdminTable> = ({ headerItems, tableItems, isLoading, removeHandler }) => {

  
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className='mt-4' />
			) : tableItems.length ? (
				tableItems.map(tableItem => (
					<AdminTableItem
						removeHandler={()=> removeHandler(tableItem._id)}
						tableItem={tableItem}
						key={tableItem._id}
					/>
				))
			) : (
				<div className={styles.notFound}>Элементы не найдены</div>
			)}
		</div>
	);
};

export default AdminTable;
