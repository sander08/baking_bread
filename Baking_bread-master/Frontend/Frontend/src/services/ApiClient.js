import axios from 'axios';
import UserService from './UserService';

export const BASE_API_URL = 'https://localhost:5000';
export const BASE_UPLOADS_URL = '/';

export default class ApiClient {
	static get = async (url, params = null) => {
		let token = UserService.getUserToken();
		return await axios.get(`${BASE_API_URL}${url}${token ? `${url.includes("?")?'&':'?'}ID=${token}` : ""}`, { params: { ...params } });
	}

	static post = async (url, data, config) => {
		let token = UserService.getUserToken();
		//axios.defaults.headers.common['accept']= '*/*';
		//axios.defaults.headers.common['content-type']= 'application/json';
		
		return await axios.post(`${BASE_API_URL}${url}${token ? `${url.includes("?")?'&':'?'}ID=${token}` : ""}`, data, config);


	}

	static put = async (url, data, config) => {
		let token = UserService.getUserToken();
		return await axios.put(`${BASE_API_URL}${token ? `${url.includes("?")?'&':'?'}ID=${token}` : ""}`, data, config);
	}

	static delete = async (url, config) => {
		let token = UserService.getUserToken();
		return await axios.delete(`${BASE_API_URL}${token ? `${url.includes("?")?'&':'?'}ID=${token}` : ""}`, config);
	}

}