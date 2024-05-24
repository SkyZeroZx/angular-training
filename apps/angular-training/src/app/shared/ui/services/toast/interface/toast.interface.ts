import { ToastTypes } from '../constant/toast.enum';

export interface ToastData {
	title: string;
	message: string;
	show?: boolean;
	type?: ToastTypes;
	timeout?: number;
}
