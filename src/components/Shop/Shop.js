import React, { useEffect, useState } from 'react';
import { Container,Col,Row, Button } from 'react-bootstrap';
import fakeData from '../../fakeData/index';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';


const Shop = ({cart,handleAddProduct,search}) => {
    
    const first9 = fakeData.slice(0, 9);               
    const [allProduct, setAllProduct] = useState([]);

    useEffect(() =>{
        if(!search.searching){ 
            setAllProduct(first9); 
        }        
        else{
            const searchProduct = fakeData.filter(pd => pd.category === search.searchName);               
            setAllProduct(searchProduct);
        }
        
    },[search.searchName])
    

    
    return (
        <div>
            <Container fluid style={{backgroundColor: '#DEE6E9'}}>
                <Row>
                    <Col lg={9}>
                        <Row style={{position: 'relative'}}>{
                            allProduct.map(singleProduct =>
                            <Product handleAddProduct={handleAddProduct} singleProduct={singleProduct}/>                      
                            )} 
                            <hr/>                       
                        </Row>
                        <hr/>
                    </Col>
                    <Col lg={3}>
                        <Cart cart={cart}>
                            <Link to="/review"><Button className="review_product">Review Cart order</Button></Link>
                        </Cart>            
                    </Col>
                </Row>                
            </Container>
        </div>
    );
};

export default Shop;