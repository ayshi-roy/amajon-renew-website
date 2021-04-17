import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import fakeData from '../../fakeData';
import { getDatabaseCart,removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import NavbarPart2 from '../Header/NavbarPart2';
import ReviewsDetails from './ReviewsDetails';
import {useHistory } from 'react-router-dom';

const Review = () => {

    const [ReviewCart, setReviewCart] = useState([]);

    const history = useHistory();

    const handleProceedCheckout = () =>{
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = ReviewCart.filter(pd => pd.key !== productKey)
        setReviewCart(newCart);
        removeFromDatabaseCart(productKey);
    } 

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]; 
            return product;
        })  
        setReviewCart(cartProducts);
    },[])

    return (
        <>
            <NavbarPart2/>
            <Container fluid>
                <Row>
                    <Col lg={9}>            
                        {
                            ReviewCart.map(review => <ReviewsDetails reviewCart={review} removeProduct={removeProduct}/>)
                        }
                    </Col>
                    <Col lg={ReviewCart.length === 0 ? 12 : 3}>
                        {
                            ReviewCart.length === 0                        
                            ? <div  style={{textAlign:'center',marginTop:'100px'}}>
                                <h1 className="text-danger">Sorry!</h1>
                                <h3 className="text-info"> You Have no review order yet</h3>
                            </div>
                            : <Cart cart={ReviewCart}>
                                <Button onClick={handleProceedCheckout} className="place_order">Proceed Checkout</Button>
                              </Cart>
                        }                    
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Review;