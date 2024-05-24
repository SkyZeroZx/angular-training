import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastService } from '../toast.service';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [
		trigger('openClose', [
			state(
				'closed',
				style({
					visibility: 'hidden',
					right: '-400px'
				})
			),
			state(
				'open',
				style({
					right: '40px'
				})
			),
			transition('open <=> closed', [animate('0.5s ease-in-out')])
		])
	]
})
export class ToastComponent implements OnInit {
	constructor(public toastService: ToastService) {}

	ngOnInit(): void {
		this.onChangeToast();
	}

	onChangeToast() {
		this.toastService.open.subscribe((data) => {
			if (data.show) {
				this.countDown(data.timeout);
			}
		});
	}

	countDown(timeout = 3000) {
		setTimeout(() => {
			this.toastService.hide();
		}, timeout);
	}
}
