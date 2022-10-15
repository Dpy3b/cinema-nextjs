import { FC } from 'react';

import SlideArrow from './SlideArrow/SlideArrow';
import styles from './Slider.module.scss';
import { ISlide } from './slider.interface';
import { useSlider } from './useSlider.interface';
import SliderItem from './SliderItem';
import { CSSTransition } from 'react-transition-group';

interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { handleClick, index, isPrev, slideIn, isNext } = useSlider(slides.length);

	return (
		<div className={styles.slider}>
            <CSSTransition in={slideIn} classNames='slide-animation' timeout={300} unmountOnExit>
            <SliderItem slide={slides[index]} butttonTitle={buttonTitle}/>
            </CSSTransition>
			{isPrev && <SlideArrow variant='left' clickHandler={() => handleClick('prev')} />}

			{isNext && <SlideArrow variant='right' clickHandler={() => handleClick('next')} />}
		</div>
	);
};

export default Slider;
