import { FC } from 'react';

import { Meta } from '@/utils/meta/Meta';

import { IHome } from './home.interface';
import Heading from '@/components/ui/heading/Heading';
import SubHeading from '@/components/ui/heading/SubHeading';
import Slider from '@/components/ui/slider/Slider';
import actors from '../../../../pages/manage/actors';

const Home: FC<IHome> = ({slides}) => {
	return (
		<Meta
			title='Watch movies online'
			description='Watch MovieApp movies and TV shows online or stream right to your browser'
		>
		<Heading title='Watch movies online' className='text-gray-300 mb-8 text-xl'/>
		{slides?.length && <Slider slides={slides} />}
			{/* <div className="my-10">
				<SubHeading aria-label="Trending movies this week">Trending now</SubHeading>
				{trendingMovies?.length && <Gallery items={trendingMovies} />}
			</div>

			<div className="my-10">
				<SubHeading aria-label="Best artists this week">Best artists</SubHeading>
				{actors?.length && <Gallery items={actors} />}
			</div> */}
		</Meta>
	);
};

export default Home;
