import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import StarRating from 'react-star-rating';
import { Col,Image,Button, Card } from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({singleProduct,handleAddProduct}) => {    

    return (
        <>
            <Col lg={4} className="mb-2">
                <div className="product-container">
                    <div>
                       <h4 className='product-category'>{singleProduct.category}</h4>
                        <br/>
                        <Image src={singleProduct.img} fluid/>
                        <div className='product-detail'>
                            <h6 className="product-name">
                                <Link to={"/product/"+singleProduct.key} className="product-name-link">{singleProduct.name}</Link>
                            </h6>
                            <h2 className="product-price">${singleProduct.price}</h2>                                        
                            <Rating name="half-rating-read" defaultValue={singleProduct.star} precision={0.5} readOnly />
                            <div className="mt-2">                                
                                <Button onClick={() => handleAddProduct(singleProduct)} className="add_to_card"><FontAwesomeIcon icon={faShoppingCart} style={{fontSize:'15px'}}/> Add to Cart</Button>
                                <Link to={"/product/"+singleProduct.key}>
                                    <Button className="product_detail">Product Detail</Button>
                                </Link>    
                            </div>
                        </div> 
                    </div>                                    
                </div>
            </Col>
        </>
    );
};

export default Product;