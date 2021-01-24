import * as React from 'react';
import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1200, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

interface IProps {
    text?: string;
    children: any;
};
const MultiCarousel = React.memo(({ children, text }: IProps) => (
    <ReactCarousel slidesToSlide={1} responsive={responsive}>
        {children}
    </ReactCarousel>
));

export default MultiCarousel;
