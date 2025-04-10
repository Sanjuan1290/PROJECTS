import { cart, updateCartQuantity, deleteItemInCart} from '../cart.js';
import { products } from '../../data/product.js';

export function renderCartItems(){
    cart.forEach( item => {
        products.forEach( product => {
    
            if(item.productId == product.id){
                document.querySelector('.item-list-container').innerHTML += 
                `
                    <div class="item-container">
                        <p class="delivery-date">Delivery date: Friday, April 18</p>
    
                        <div class="item-option-container">
                            <div class="item-image-container">
                                <img src="${product.image}">
                            </div>
    
                            <div class="item-name-price-quantity-container">
                                <p>${product.name}</p>
                                <p>$${(product.priceCents / 100).toFixed(2)}</p>
                                
                                <div class="quantity-update-delete js-quantity-update-delete-${item.productId}">
                                    <p>Quantity: ${item.quantity}</p>
                                    <button class="js-update-button" data-item-id="${item.productId}">Update</button>
                                    <button class="js-delete-button" data-item-id="${item.productId}">Delete</button>
                                </div>
                            </div>
    
                            <div class="delivery-option-container">
                                <p>Choose a delivery option:</p>
    
                                <div class="delivery-option">
                                    <input type="radio" name="option1">
                                    <div class="option-date-price">
                                        <p>Firday, April 18</p>
                                        <p>FREE Shipping</p>
                                    </div>
                                </div>
    
                                <div class="delivery-option">
                                    <input type="radio" name="option1">
                                    <div class="option-date-price">
                                        <p>Monday, April 14</p>
                                        <p>$4.99 - Shipping</p>
                                    </div>
                                </div>
    
                                <div class="delivery-option">
                                    <input type="radio" name="option1">
                                    <div class="option-date-price">
                                        <p>Thursday, April 10</p>
                                        <p>$9.99 - Shipping</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        })
    })

    updateCartQuantity();
    deleteItemInCart();
}