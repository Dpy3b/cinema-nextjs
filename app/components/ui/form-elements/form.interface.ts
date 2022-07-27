//import { EditorProps } from 'draft-js';
import { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes } from 'react';
import { ControllerRenderProps, FieldError, FieldErrors } from 'react-hook-form';


export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string;
	error?: FieldError | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypeInputPropsField {}

//type TypeEditorPropsField = EditorProps & IFieldProps;

/* export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void;
	value: any;
	field: any;
} */

export interface IUploadField {
	onChange: (...event: any[]) => void;
	placeholder: string;
	isPhotos?: boolean;
	folder?: string;
	value?: any;
	error?: FieldError;
	style?: CSSProperties;
	isNoImage?: boolean;
	field?: ControllerRenderProps<any, any>;
}