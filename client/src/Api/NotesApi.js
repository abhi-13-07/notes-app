import axios from 'axios';
import { BASE_URL } from './endpoint';

class NotesApi {
	constructor() {
		this.endpoint = BASE_URL;
		this.accessToken = '';
	}

	setAccessToken(token) {
		this.accessToken = token;
	}

	async getAllNotes(userId, cancelToken) {
		try {
			console.log(this.accessToken);
			const response = await axios.get(
				`${this.endpoint}/notes/all?userId=${userId}`,
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
					cancelToken,
				}
			);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (err) {
			if (err.response) {
				const { data, status } = err.response;
				return {
					data,
					status,
				};
			}
			if (axios.isCancel(err)) {
				console.log('Request canceled!!');
				return err.request;
			}
		}
	}

	async addNote(data, cancelToken) {
		try {
			const response = await axios.post(`${this.endpoint}/notes/new`, data, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
				cancelToken,
			});

			return {
				data: response.data,
				status: response.status,
			};
		} catch (err) {
			if (err.response) {
				const { data, status } = err.response;
				return {
					data,
					status,
				};
			}
			if (axios.isCancel(err)) {
				console.log('canceled request');
				return err.request;
			}
		}
	}

	async updateNote(id, data, cancelToken) {
		try {
			const response = await axios.put(
				`${this.endpoint}/notes/edit/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
					cancelToken,
				}
			);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (err) {
			if (err.response) {
				const { data, status } = err.response;
				return {
					data,
					status,
				};
			}
			if (err.request) {
				return err.request;
			}
		}
	}

	async deleteNote(id, cancelToken) {
		try {
			console.log(this.accessToken);

			const response = await axios.delete(
				`${this.endpoint}/notes/delete/${id}`,
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
					cancelToken,
				}
			);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (err) {
			if (err.response) {
				const { data, status } = err.response;
				return {
					data,
					status,
				};
			}
			if (err.request) {
				return err.request;
			}
		}
	}
}

export default NotesApi;
