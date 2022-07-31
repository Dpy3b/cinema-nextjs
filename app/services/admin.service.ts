import axios from 'api/interceptors';



// берем как импорт по умолчанию
import { getUsersUrl } from '@/config/api.config';


export const AdminService = {
	async getCountUsers() {
		return axios.get<number>(getUsersUrl('/count'));
	},
};