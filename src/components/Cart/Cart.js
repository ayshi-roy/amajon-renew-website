import React from 'react';
import { Card } from 'react-bootstrap';

import './Cart.css';

const Cart = (props) => {
    console.log(props)
    const cart = props.cart;

    const total = cart.reduce((total,prd) => Math.round(total+prd.price * prd.quantity),0);
    let shipping = 0;
    if (total > 35){
        shipping = 0;
    } 
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);

    const AllTotal = (total + shipping + Number(tax)).toFixed(2);

    return (
        <div >
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className='oderSummary'>Order Summary</Card.Title>
                    <Card.Subtitle className="item-order">Item Order = {cart.length}</Card.Subtitle>
                    <Card.Text>
                        <div className='cardPrice'>
                            <div className='card-price-left float-left'>
                                <h6>Product Price =</h6>
                                <h6>Shipping price = </h6>
                                <h6>Product Tax =</h6>
                                <hr/>
                                <h6>Total prize =</h6>
                            </div>
                            <div className='card-price-right float-right'>
                                <h6>{total}</h6>
                                <h6>{shipping}</h6>
                                <h6>{tax}</h6>
                                <hr/>
                                <h6>{AllTotal}</h6>
                            </div>
                        </div>                                                
                    </Card.Text>
                    <Card.Link className='review-button' href="#">
                        {
                            props.children
                        }                                            
                    </Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Cart;