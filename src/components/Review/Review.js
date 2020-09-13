import React from "react";
import { useEffect,useState } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from "../../fakeData";
import ReviewItem from "../RviewItem/ReviewItem";
import './Review.css';
import Cart from "../Cart/Cart";
import thanksImage from '../../images/thank-you.gif';
import { useHistory } from "react-router-dom";
// pd = product

const Review = () => {

    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory()

    const [cart,setCart]= useState([]);
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

   const handleProceedCheckout = () => {

    history.push('/shipment');
    //    setCart([]);
    //    setOrderPlaced(true);
    //    processOrder();
       //console.log("handlePlaceOrder")
   }

    useEffect(() =>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key =>  {
        const product = fakeData.find(pd=>pd.key === key);
        product.quantity = savedCart[key];
        return product;
        } );
        setCart(cartProducts);
        // console.log(counts);
    },[]);
    let thanks ;
    if (orderPlaced) {
        thanks = <img className="img-container" src={thanksImage} alt=""/>
    }
    return (
        <div className="review-container">

            <div className="right-container">
            {
                cart.map(pd=> <ReviewItem
                key={pd.key}
                removeProduct = {removeProduct}
                product={pd}></ReviewItem>)

               
            }
             {  thanks  }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button> 
                </Cart>
            </div>
        
        </div>
    );
       
};

export default Review;