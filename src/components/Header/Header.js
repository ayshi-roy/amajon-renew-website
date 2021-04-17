import React from 'react';
import NavbarPart from './NavbarPart';
import NavbarPart2 from './NavbarPart2';

const Header = ({cart,handleSearch}) => {
    return (
        <div>               
            <NavbarPart handleSearch={handleSearch} cart={cart}></NavbarPart>
            <NavbarPart2></NavbarPart2>            
        </div>
    );
};

export default Header;