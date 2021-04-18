import React from 'react';
import logo1 from '../../images/logo1.jpg';
import usa from '../../images/usa.png';
import './NavbarPart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faSearch } from '@fortawesome/free-solid-svg-icons'
import { Image,Nav,Navbar,NavDropdown,Button,FormControl,InputGroup,Dropdown,DropdownButton } from 'react-bootstrap';



const NavbarPart = ({handleSearch,cart}) => {

    
    return (
        <div>
            <Navbar id='top' style={{backgroundColor:'#231F20',zIndex:'1'}} expand="lg">
                <Navbar.Brand href="#home">
                    <Image src={logo1} fluid style={{height: '40px'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home"><small style={{color: '#7E7F7F'}}>Delivery to</small><br/> Bangladesh</Nav.Link>
                        <InputGroup className="m-3">
                            <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title="All"
                            id="input-group-dropdown-1"
                            style={{background:'light-gray',color:"black"}}
                            >
                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                            </DropdownButton>
                            <FormControl
                                onBlur={handleSearch}
                                placeholder="search product category"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                style={{width:'500px'}}
                             />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" className="btn btn-primary"><span><FontAwesomeIcon icon={faSearch}/></span></Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Image src={usa} fluid style={{height: '15px',marginTop:'25px'}}/>
                        <NavDropdown id="basic-nav-dropdown" style={{marginTop:'15px'}}>                            
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> 
                        <Nav.Link href="#home">
                            <small>Hello Sign In </small><span><b>Account & List</b></span>
                        </Nav.Link>
                        <Nav.Link href="#link"><small>Returns  </small><span><b> & Order</b></span></Nav.Link> 
                        <Nav.Link href="#home"><span style={{fontWeight: 'bold'}} className="text-danger">{cart.length}</span><FontAwesomeIcon icon={faShoppingCart} style={{fontSize:'25px'}}/></Nav.Link>                   
                    </Nav> 
                </Navbar.Collapse>
            </Navbar>            
        </div>
    );
};

export default NavbarPart;