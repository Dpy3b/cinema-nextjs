import  axios,{ axiosClassic } from 'api/interceptors';




import { getGenresUrl } from '../config/api.config';
import { IGenre } from '../shared/types/movie.types';



import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface';


export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(``), {
			// тут вроде было , хз
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		});
	},
	async getGenreById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},
	async getCollections() {
	//return axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`));
	},

	async create() {
		return axios.post<string>(getGenresUrl(`/`));
	},
	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},
	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},
};