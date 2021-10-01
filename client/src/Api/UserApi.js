import axios from 'axios';
import { BASE_URL } from './endpoint';

class UserApi {
	constructor() {
		this.endpoint = BASE_URL;
		this.accessToken = '';
	}

	setAccessToken(token) {
		this.accessToken = token;
	}

	async updateUser(details, id, cancelToken) {
		try {
			const { data, status } = await axios.put(
				`${this.endpoint}/users/update/${id}`,
				details,
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
					cancelToken,
				}
			);
			return {
				data,
				status,
			};
		} catch (err) {
			if (err.response) {
				const { data, status } = err.response;
				return { data, status };
			}
		}
	}
}

export default UserApi;
