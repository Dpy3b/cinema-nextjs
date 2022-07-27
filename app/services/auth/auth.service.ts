import { getContentType } from 'api/api.helpers';
import { axiosClassic } from 'api/interceptors';
import Cookies from 'js-cookie';



import { removeTokensStorage, saveToStorage } from './auth.helper';
import { API_URL, getAuthUrl } from '@/config/api.config';
import { IAuthResponce } from '@/store/user/user.interface';
import axios from 'axios';


export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponce>(getAuthUrl('/register'), {
			email,
			password,
		});
		if (response.data.accessToken) {
			saveToStorage(response.data);
		}

		return response;
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponce>(getAuthUrl('/register'), {
			email,
			password,
		});
		if (response.data.accessToken) {
			saveToStorage(response.data);
		}

		return response;
	},

	logout() {
		removeTokensStorage();
	//	localStorage.removeItem('user');
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken');
		const response = await axios.post<IAuthResponce>(
			`${API_URL}${getAuthUrl('/login/access-token')}`,
			{ refreshToken },
			{ headers: getContentType() }
		);

		if (response.data.accessToken) {
			saveToStorage(response.data);
		}

		return response;
	},
};