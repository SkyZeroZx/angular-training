import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastData } from './interface/toast.interface';
import { ToastTypes } from './constant/toast.enum';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	data!: ToastData;
	public open = new Subject<ToastData>();

	success(data: ToastData) {
		this.data = { ...data, show: true, type: ToastTypes.success };
		this.open.next(this.data);
	}

	error(data: ToastData) {
		this.data = { ...data, show: true, type: ToastTypes.error };
		this.open.next(this.data);
	}

	warn(data: ToastData) {
		this.data = { ...data, show: true, type: ToastTypes.warn };
		this.open.next(this.data);
	}

	hide() {
		this.data = { ...this.data, show: false };
		this.open.next(this.data);
	}
}
