import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import footerFakeData from '../../fakeData/footerFakeData';
import './Footer.css';

// const componentDidMount = () => {
//     window.scroll({
//         top: document.body.offsetHeight,
//         left: 0, 
//         behavior: 'smooth',
//       });
// }


const FooterPart1 = () => {
    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
        setVisible(true)
        } 
        else if (scrolled <= 300){
        setVisible(false)
        }
    };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
    
    return (
        <div>
            <div className="backTo">
                <p onClick={scrollToTop} 
                    style={{display: visible ? 'inline' : 'none'}}>
                    Back To Top
                </p>
            </div>
            <div className="footer-container">
                <Container>
                    <Row>
                    {
                        footerFakeData.map(footer => 
                            <Col lg={3} className="">
                                <ul>
                                    <h5 style={{fontWeight:'bold',color:'white'}}>{footer.header}</h5>
                                    <h6><a href="#">{footer.text1}</a></h6>                                    
                                    <h6><a href="#">{footer.text2}</a></h6>
                                    <h6><a href="#">{footer.text3}</a></h6>
                                    <h6><a href="#">{footer.text4}</a></h6>
                                    <h6><a href="#">{footer.text5}</a></h6>
                                    <h6><a href="#">{footer.text6}</a></h6>
                                    <h6><a href="#">{footer.text7}</a></h6>
                                    <h6><a href="#">{footer.text8}</a></h6>
                                </ul>
                            </Col>   
                        )
                    }                
                    </Row>
                </Container>
            </div>
            
        </div>
    );
};

export default FooterPart1;