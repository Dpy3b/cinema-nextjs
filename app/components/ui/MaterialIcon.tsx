/* import { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '@/shared/types/icons.types';

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const IconComponent = MaterialIcons[name];

	return <IconComponent /> || <MaterialIcons.MdDragIndicator />;
};

export { MaterialIcon };
 */


import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

/* import { useRenderClient } from '../../hooks/useRenderClient' */
import { IMaterialIcon } from '@/shared/types/icons.types'

const MaterialIcon: FC<IMaterialIcon> = ({ name, className, ...rest }) => {
	/* const { isRenderClient } = useRenderClient() */

	const IconComponent = MaterialIcons[name]
		return MaterialIcons[name] ? (
			<IconComponent className={className} {...rest}/>
		) : (
			<MaterialIcons.MdDragIndicator />
		)
		
	}


export default MaterialIcon