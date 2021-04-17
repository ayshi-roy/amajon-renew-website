import React from 'react';
import { Carousel } from 'react-bootstrap';
import slider1 from '../../images/slider1.jpg';
import slider2 from '../../images/slider2.jpg';
import slider3 from '../../images/slider3.jpg';
import slider4 from '../../images/slider4.jpg';
import slider5 from '../../images/slider5.jpg';
import Shop from '../Shop/Shop';
import './CarouselPart.css';


const CarouselPart = ({cart,handleAddProduct,search}) => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={slider1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={slider2}
                    alt="Third slide"
                    />                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={slider3}
                    alt="Third slide"
                    />                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={slider4}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={slider5}
                    alt="Third slide"
                    />
                </Carousel.Item>                
            </Carousel>
            <Shop search={search} cart={cart} handleAddProduct={handleAddProduct}></Shop>
        </div>
    );
};

export default CarouselPart;