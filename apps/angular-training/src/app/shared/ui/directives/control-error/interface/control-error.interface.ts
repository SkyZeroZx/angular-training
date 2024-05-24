export interface ControlErrors<T> {
	[key: string]: (params: T) => string;
}
