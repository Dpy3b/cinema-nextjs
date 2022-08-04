import { TypeMaterialIconName } from '@/shared/types/icons.types';

export interface IMenuItem {
	icon: TypeMaterialIconName ;//| TypeGiIconName; // от себя добавил
	title: string;
	link: string;
}

export interface IMenu {
	title: string;
	items: IMenuItem[];
}
