import axios from 'axios';
import { BASE_URL } from './endpoint';

class AuthApi {
	constructor() {
		this.endpoint = BASE_URL;
		this.cancelToken = axios.CancelToken.source();
	}

	async login({ email, password }) {
		try {
			const response = await axios.post(
				`${this.endpoint}/auth/login`,
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);
			return response.data;
		} catch (err) {
			console.log(err);
			if (err.response) {
				return err.response.data;
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async register({ name, email, password }) {
		try {
			const response = await axios.post(`${this.endpoint}/auth/register`, {
				name,
				email,
				password,
			});
			return response.data;
		} catch (err) {
			console.log(err);
			if (err.response) {
				return err.response.data;
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async refreshAccessToken() {
		try {
			const response = await axios.get(`${this.endpoint}/auth/refresh`);
			return response.data;
		} catch (err) {
			console.log(err);
			if (err.response) {
				return err.response.data;
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async logout() {
		try {
			const response = await axios.get(`${this.endpoint}/auth/logout`, {
				withCredentials: true,
			});
			return response.data;
		} catch (err) {
			console.log(err);
			if (err.response) {
				return err.response.data;
			}

			if (err.request) {
				return err.request;
			}
		}
	}
}

export default AuthApi;
