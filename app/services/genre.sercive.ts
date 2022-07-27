import { axiosClassic } from 'api/interceptors';

import { getGenresUrl } from './../config/api.config';
import { IGenre } from './../shared/types/movie.types';

export const GenreSercive = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl('/popular'), {
			params: searchTerm ? {
				searchTerm
			} : {},
		});
	},
};
