import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { CartContext, UserContext } from '../../App';
import NavbarPart2 from '../Header/NavbarPart2';
import { useForm } from 'react-hook-form';
import delivery from '../../images/delivery.png';
import './Shipment.css';
import { processOrder } from '../../utilities/databaseManager';

const Shipment = () => {

    const [loggedInUser] = useContext(UserContext);
    const [setCart] = useContext(CartContext);
    const { register, handleSubmit,formState: { errors }, reset } = useForm();

    const [placeOrder, setPlaceOrder] = useState(false);

    const onSubmit = (data) => {
        setPlaceOrder(true);
        processOrder();
        setCart([]);
        console.log(data);
        reset();
    }
    return (
        <div>
            <NavbarPart2/>
            <Container>
                {
                    placeOrder ?
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='order-receive mt-5'>
                                <center>                                    
                                    <h1>Your Order Receive SuccessFully</h1>
                                    <p>You will be getting your products after 2 days</p>
                                    <h2>Thank you...</h2>
                                    <br/>
                                    <img src={delivery} className='img-fluid'/>
                                </center>                                
                            </div>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col lg={5} md={5}>
                            <div className='delivery-detail'>
                                <div className='delivery-header-text'>
                                    <h1>Edit Delivery Details</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Control type="text" className="input-field" placeholder="Name" defaultValue={loggedInUser.FirstName} {...register("FirstName", {required: true, maxLength: 80})} />
                                        {errors.FirstName && "First name is required"}
                                    <Form.Control type="email" className="input-field" placeholder="email" defaultValue={loggedInUser.email} {...register("email", {required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} />
                                        {errors.email && "Email is required"}    
                                    <Form.Control type="number" className="input-field" placeholder="Phone number" {...register("phone", {required: true, maxLength: 10})} />
                                        {errors.phone && "First name is required"}
                                    <Form.Control type="text" as="textarea" rows={3} className="input-field" placeholder="Full Address" {...register("address", {required: true, maxLength: 50})} />
                                        {errors.address && "Address is required"}
                                    <input className='delivery-submit-btn' value='Place Order' type="submit" />            
                                </form>
                            </div>
                        </Col>
                        <Col lg={7} md={7}>
                            <div className='delivery-detail'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d233667.8223908687!2d90.27923710646989!3d23.780887457084543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1618625004774!5m2!1sen!2sbd" width="680" height="490" allowFullscreen="" loading="lazy"></iframe>
                            </div>
                        </Col>
                    </Row>
                }
                
            </Container>            
        </div>
    );
};

export default Shipment;