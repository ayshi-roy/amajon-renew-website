import React, { useContext } from 'react';
import './NavbarPart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {Nav,Navbar } from 'react-bootstrap';

// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { UserContext } from '../../App';
// import Typography from '@material-ui/core/Typography';

const NavbarPart2 = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home"><FontAwesomeIcon icon={faAlignJustify} color="white"/><b>All</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="pl-3"><Link className="linkTo" to="/home">Home</Link></Nav.Link>
                        <Nav.Link className="pl-3"><Link className="linkTo" to="/review">Review Orders</Link></Nav.Link>                                               
                        <Nav.Link className="pl-3"><Link className="linkTo" to="/login">Log In</Link></Nav.Link>
                        <Nav.Link className="pl-3"><Link className="linkTo" to="/shipment">Shipment</Link></Nav.Link>
                        <Nav.Link className="pl-3">Registry</Nav.Link>                
                    </Nav>
                    <Nav className="ml-auto">                        
                         {
                            loggedInUser.email ?
                            <>
                                <Nav.Link className="pl-3">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={loggedInUser.photo} />
                                        </ListItemAvatar>
                                        {   loggedInUser.FirstName
                                            ? 
                                            <ListItemText
                                            primary={loggedInUser.FirstName}                                            
                                            />
                                            : 
                                            <ListItemText
                                                primary = {'User Logged In'}
                                            />
                                        }      
                                    </ListItem>
                                </Nav.Link>
                                <Nav.Link href="#home" onClick={() => setLoggedInUser({})} className="pl-3 log-out">Log Out</Nav.Link>
                            </> 
                            :
                            <Nav.Link href="#home" className="pl-3">
                                Amazon's response to <b>COVID-19</b>
                            </Nav.Link>    
                          }  
                    </Nav>                
                </Navbar.Collapse>
            </Navbar>
    );
};

export default NavbarPart2;