/* import * as MaterialIcons from 'react-icons/md';

export type TypeMaterialIconName = keyof typeof MaterialIcons;
 */
// каким-то образом штука ниже заработала
import { HTMLAttributes } from 'react';
//import * as GiIcons from 'react-icons/gi';
import * as MaterialIcons from 'react-icons/md';


export type TypeMaterialIconName = keyof typeof MaterialIcons;

//export type TypeGiIconName = keyof typeof GiIcons;

export interface IMaterialIcon extends HTMLAttributes<SVGElement> {
	name: TypeMaterialIconName;
}