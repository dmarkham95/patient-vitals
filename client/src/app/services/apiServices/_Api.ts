import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getItem } from '../utils/localStorageService';

export class Api {
	private api: AxiosInstance;

	protected constructor(config: AxiosRequestConfig) {
		this.api = axios.create(config);

		// this middleware is been called right before the http request is made.
		this.api.interceptors.request.use((config: AxiosRequestConfig) => {
			const token = getItem('patient_vitals_access_token');
			config.headers.common['Authorization'] = token ? 'Bearer ' + token : null;
			return config;
		});

		// this middleware is been called right before the response is get it by the method that triggers the request
		this.api.interceptors.response.use((param: AxiosResponse) => ({
			...param,
		}));
	}

	protected getUri(config?: AxiosRequestConfig): string {
		return this.api.getUri(config);
	}

	protected request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.api.request(config);
	}

	protected get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.api.get(url, config);
	}

	protected delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.api.delete(url, config);
	}

	protected head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.api.head(url, config);
	}

	protected post<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
		return this.api.post(url, data, config);
	}

	protected put<T, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.api.put(url, data, config);
	}

	protected patch<T, R = AxiosResponse<T>>(url: string, data?: string, config?: AxiosRequestConfig): Promise<R> {
		return this.api.patch(url, data, config);
	}
}
