import axios from 'axios';
import { BASE_URL } from './endpoint';

class NotesApi {
	constructor() {
		this.endpoint = BASE_URL;
		this.cancelToken = axios.CancelToken.source();
	}

	async getAllNotes(userId, accessToken) {
		try {
			const response = await axios.get(
				`${this.endpoint}/notes/all?userId=${userId}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					cancelToken: this.cancelToken.token,
				}
			);

			return {
				data: response.data,
				status: response.status,
			};
		} catch (err) {
			console.clear();
			if (err.response) {
				const { data, status } = err.response;
				return {
					data,
					status,
				};
			}
			if (err.request) {
				console.log(err.request);
				return err.request;
			}
		}
	}

	async addNote(data, accessToken) {
		try {
			const response = await axios.post(`${this.endpoint}/notes/new`, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				cancelToken: this.cancelToken,
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
			if (err.request) {
				return err.request;
			}
		}
	}

	async updateNote(id, data, accessToken) {
		try {
			const response = await axios.put(
				`${this.endpoint}/notes/edit/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					cancelToken: this.cancelToken.token,
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

	async deleteNote(id, accessToken) {
		try {
			const response = await axios.delete(
				`${this.endpoint}/notes/delete${id}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					cancelToken: this.cancelToken,
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
