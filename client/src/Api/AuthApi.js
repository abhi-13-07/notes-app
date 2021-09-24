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
			return { data: response.data, status: response.status };
		} catch (err) {
			console.log(err);
			if (err.response) {
				return { data: err.response.data, status: err.response.status };
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async googleLogin(tokenId) {
		try {
			const response = await axios.post(
				`${this.endpoint}/auth/verify-google-login`,
				{
					tokenId,
				},
				{
					withCredentials: true,
				}
			);
			return { data: response.data, status: response.status };
		} catch (err) {
			console.log(err);
			if (err.response) {
				const response = err.response;
				return { data: response.data, stauts: response.status };
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async register({ name, email, password, confirmPassword }) {
		try {
			const response = await axios.post(`${this.endpoint}/auth/register`, {
				name,
				email,
				password,
				confirmPassword,
			});
			return { data: response.data, status: response.status };
		} catch (err) {
			console.log(err);
			if (err.response) {
				return { data: err.response.data, status: err.response.status };
			}

			if (err.request) {
				return err.request;
			}
		}
	}

	async refreshAccessToken() {
		try {
			const response = await axios.get(`${this.endpoint}/auth/refresh`, {
				withCredentials: true,
			});
			return { data: response.data, status: response.status };
		} catch (err) {
			console.log(err);
			if (err.response) {
				return { data: err.response.data, status: err.response.status };
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
			return { data: response.data, status: response.status };
		} catch (err) {
			console.log(err);
			if (err.response) {
				return { data: err.response.data, status: err.response.status };
			}

			if (err.request) {
				return err.request;
			}
		}
	}
}

export default AuthApi;
