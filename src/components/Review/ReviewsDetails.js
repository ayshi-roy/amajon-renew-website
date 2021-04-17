import React from 'react';
import { Button, Col } from 'react-bootstrap';
import './Review.css';

const ReviewsDetails = ({reviewCart,removeProduct}) => {
    console.log(reviewCart)
    return (
        <Col lg={12} className='review-main-part'>
            <div className="d-flex review-single-part">
                <img src={reviewCart.img} className="img-fluid"/>
                <div className="review-text-area">
                    <h4>{reviewCart.name}</h4>
                    <h6><span>Price :</span> ${reviewCart.price}</h6>
                    <h6><span>Stock :</span> {reviewCart.stock}</h6>
                    <h6><span>Quantity :</span> {reviewCart.quantity}</h6>
                    <Button onClick={() => removeProduct(reviewCart.key)} className="place_order">Remove Order</Button>
                </div>
            </div>
        </Col> 
    );
};

export default ReviewsDetails;