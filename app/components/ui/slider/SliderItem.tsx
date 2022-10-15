import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './Slider.module.scss';
import { ISlide } from './slider.interface';

interface ISliderItem {
	slide: ISlide;
	butttonTitle?: string;
}

const SliderItem: FC<ISliderItem> = ({ slide, butttonTitle = 'Watch' }) => {
	const { push } = useRouter();
	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
                className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					layout='fill'
					unoptimized
					draggable={false}
					priority
				/>
			)}
            <div className={styles.content}>
                <div className={styles.heading}>{slide.title}</div>
                <div className={styles.subHeading}>{slide.subtitle}</div>
                <button className={styles.button} onClick={()=> push(slide.link)}>{butttonTitle}</button>
            </div>
		</div>
	);
};

export default SliderItem;
