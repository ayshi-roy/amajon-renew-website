import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Rating from '@material-ui/lab/Rating';
import './ProductDetail.css';
import NavbarPart2 from '../Header/NavbarPart2';


const ProductDetail = () => {
    const {productKey} = useParams();    

    const singleProduct = fakeData.find(pd => pd.key === productKey); 
     
    return (
        <div>
            <NavbarPart2/>
            <Container className='d-flex' fluid>
                <Col md={4}>
                    <div className='productDetail-image-part'> 
                        <img className="productDetail-img" src={singleProduct.img}/>
                    </div>                
                </Col>
                <Col md={8}>
                    <div className='productDetail-text-part'>
                        <h4>{singleProduct.name}</h4>
                        <div className='d-flex'>
                            <Rating name="half-rating-read" defaultValue={singleProduct.star} precision={0.5} readOnly />
                            <p>Rating {singleProduct.star}</p>
                        </div>
                        <div className="productDetail-price-stock">
                            <h5> <span className="productDetail-span">Price :</span> ${singleProduct.price}</h5>
                            <h5><span className="productDetail-span">shipping Price : </span>${singleProduct.shipping}</h5>
                            <h5><span className="productDetail-span">Stock :</span> {singleProduct.stock}</h5>
                        </div>                        
                        {
                            singleProduct.features.map(feature => 
                            <div className='productDetail-description'>
                                <div className=' d-flex justify-content-between'>
                                    <h6 className='productDetail-description-left'>{feature.description} :</h6>
                                    <h6 className='productDetail-description-right'>{feature.value}</h6>                                                               
                                </div>
                            </div>    
                        )}
                    </div>                
                </Col>            
            </Container>
        </div>        
    );
};

export default ProductDetail;