export interface CreateModal {
	mode?: 'dialog' | 'modal' | 'bottom-sheet';
	/**
	 * This is required since ngStyle is using `any` as well
	 * More details in https://angular.io/api/common/NgStyle
	 *  */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	style?: { [k: string]: any };

	/** It's propertie to pass data in other context of modal */
	data?: unknown;
}
