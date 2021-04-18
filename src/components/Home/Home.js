import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../App';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import CarouselPart from '../Carousel/CarouselPart';
import Discover from '../Discover/Discover';
import FooterMain from '../Footer/FooterMain';
import Header from '../Header/Header';

const Home = () => {
    
    const [cart,setCart] = useContext(CartContext);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const filterProduct = productKey.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey)
            product.quantity = saveCart[pdKey];
            return product;
        })
        setCart(filterProduct);
    },[]) 

    const handleAddProduct = (product) => { 
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);        
        let count = 1;
        let newCart;

        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product]; 
        }

        setCart(newCart);        
        addToDatabaseCart(product.key,count)

    }

    //search bar work
    const [search, setSearch ] = useState({
        searchName: '',
        searching: false
    });

    const handleSearch = (e) => {        
        const Value = e.target.value;
        if(Value !== ''){
            const searchValue = {
                searchName: Value,
                searching: true
            }
            console.log(searchValue);
            setSearch(searchValue);
            console.log(search);
        }
        else{
            const searchValue = {
                searchName: '',
                searching: false
            }
            setSearch(searchValue);
        }
        
    }

    return (
        <div>
            <Header handleSearch={handleSearch} cart={cart}></Header>
            <CarouselPart search={search} cart={cart} handleAddProduct={handleAddProduct}></CarouselPart>
            <Discover></Discover>
            <FooterMain/>
        </div>
    );
};

export default Home;