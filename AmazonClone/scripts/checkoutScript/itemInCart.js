import { cart, updateCartQuantity, deleteItemInCart, saveCartItems} from '../cart.js';
import { products } from '../../data/product.js';
import {getDeliveryDate, getDate} from '../../data/deliveryDate.js'

export function renderCartItems(){
    cart.forEach( item => {
        products.forEach( product => {
    
            if(item.productId == product.id){
                document.querySelector('.item-list-container').innerHTML += 
                `
                    <div class="item-container">
                        <p class="delivery-date delivery-date-${product.id}">Delivery date: ${getDeliveryDate(item.deliveryPriceCents)}</p>
    
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
                                    <input type="radio" name="option-${item.productId}" value="0">
                                    <div class="option-date-price">
                                        <p>${getDate(10)}</p>
                                        <p>FREE Shipping</p>
                                    </div>
                                </div>
    
                                <div class="delivery-option">
                                    <input type="radio" name="option-${item.productId}" value="499">
                                    <div class="option-date-price">
                                        <p>${getDate(7)}</p>
                                        <p>$4.99 - Shipping</p>
                                    </div>
                                </div>
    
                                <div class="delivery-option">
                                    <input type="radio" name="option-${item.productId}" value="999">
                                    <div class="option-date-price">
                                        <p>${getDate(3)}</p>
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

export function saveDeliveryOption(){
    
    cart.forEach( item => {
        let radioBtnList = document.querySelectorAll(`input[name="option-${item.productId}"]`)

        if(radioBtnList[0].checked){
            item.deliveryPriceCents = 0;
        }else if(radioBtnList[1].checked){
            item.deliveryPriceCents = 499;
        }else if(radioBtnList[2].checked){
            item.deliveryPriceCents = 999;
        }
        
        setCheckedRadioBtn(item, radioBtnList);

            
        document.querySelector(`.delivery-date-${item.productId}`).innerHTML = 
        `
            Delivery date: ${getDeliveryDate(item.deliveryPriceCents)}
        `;
    })
    saveCartItems();
}

export function setCheckedRadioBtn(item, radioBtnList){

    if(item.deliveryPriceCents == Number(radioBtnList[0].value)){
        radioBtnList[0].checked = true;
    }else if(item.deliveryPriceCents == Number(radioBtnList[1].value)){
        radioBtnList[1].checked = true;
    }else if(item.deliveryPriceCents == Number(radioBtnList[2].value)){
        radioBtnList[2].checked = true;
    }
}