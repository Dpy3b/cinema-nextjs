import type { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/Home';
//import { actorService } from '@/services/actor.service';
//import { movieService } from '@/services/movie.service';
//import { IGalleryItem } from '@/ui/gallery/gallery.interface';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { getActorUrl, getMovieUrl } from '@/config/url.config';
import { IHome } from '@/screens/home/home.interface';
import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';
import { ISlide } from '@/ui/slider/slider.interface';
import { getGenresList } from '@/utils/movie/getGenresList';

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<>
			<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await MovieService.getAll();

		const slides: ISlide[] = data.slice(0, 3).map(m => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			bigPoster: m.bigPoster,
			subtitle: getGenresList(m.genres),
			title: m.title,
		}));

		const { data: dataActors } = await ActorService.getAll();

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map(item => ({
			name: item.name,
			posterPath: item.photo,
			link: getActorUrl(item.slug),
			content: {
				title: item.name,
				subTitle: `+${item.countMovies} movies`,
			},
		}));

		const dataTrendingMovies = await MovieService.getMostPopularMovies();

		const trendingMovies: IGalleryItem[] = dataTrendingMovies.slice(0, 7).map(item => ({
			name: item.title,
			posterPath: item.poster,
			link: getMovieUrl(item.slug),
		}));

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
		};
	} catch (e) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		};
	}
};

export default HomePage;
