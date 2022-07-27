import { getGenreUrl } from './../../../../../config/url.config';
import { IMenuItem } from './../menu.interface';
import { useQuery } from "react-query";



import { GenreSercive } from './../../../../../services/genre.sercive';


export const usePopularGenres = () => {
    // первый аргумент - уникальный ключ для идентификации запросов
    const queryData = useQuery('popular genre menu', () => GenreSercive.getAll(), {
		select: ({ data }) => data.map(genre => ({
            icon: genre.icon,
            link: getGenreUrl(genre.slug),
            title: genre.name
        } as IMenuItem)).splice(0, 4),


	});


return queryData;
}