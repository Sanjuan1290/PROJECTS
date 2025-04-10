import { products } from "../data/product.js";
import { renderNavBar } from "./amazonScripts/header.js";
import { renderCheckoutHeader } from './checkoutScript/header.js'

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        priceCents: 1090,
        quantity: 1
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        priceCents: 2095,
        quantity: 2
    }];
}


export function addToCart(productId, quantity){

    products.forEach(product => {
        if(product.id == productId){

            const existingItem = cart.find(item => productId == item.productId)

            if(existingItem){
                existingItem.quantity += quantity;
            }else{
                cart.push({
                    productId: product.id,
                    priceCents: product.priceCents,
                    quantity: quantity
                })
            }
        }
    })
    console.log(cart);
    saveCartItems();
    renderNavBar();
}


export function saveCartItems(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateCartQuantity(){
    document.querySelectorAll(`.js-update-button`).forEach( updateBtn => {
        updateBtn.addEventListener('click' , () => {
            const itemId = updateBtn.dataset.itemId;
            console.log(itemId);

            cart.forEach( item => {
                if(item.productId == itemId){
                    document.querySelector(`.js-quantity-update-delete-${itemId}`).innerHTML = 
                    `
                        <p>Quantity: <input class="quantity-number js-quantity-number-${item.productId}" type="number" value="${item.quantity}"></p>
                        <button class="js-save-button"">Save</button>
                        <button class="js-delete-button" data-item-id="${item.productId}">Delete</button>
                    `
        
                    document.querySelectorAll(`.js-save-button`).forEach( saveBtn => {
                        saveBtn.addEventListener('click', () => {
                            item.quantity = Number(document.querySelector(`.js-quantity-number-${item.productId}`).value);
                            document.querySelector(`.js-quantity-update-delete-${itemId}`).innerHTML = 
                            `
                                <p>Quantity: ${item.quantity}</p>
                                <button class="js-update-button" data-item-id="${item.productId}">Update</button>
                                <button class="js-delete-button" data-item-id="${item.productId}">Delete</button>
                            `
                            
                            saveCartItems();
                            updateCartQuantity();
                            deleteItemInCart();
                            renderCheckoutHeader();
                        })
                    })
                }
            })
            
            deleteItemInCart();
            renderCheckoutHeader();
        })
    })
}

export function deleteItemInCart(){
    document.querySelectorAll(`.js-delete-button`).forEach( deleteBtn => {
        deleteBtn.addEventListener('click', () => {
            const itemId = deleteBtn.dataset.itemId;

            cart = cart.filter( item => item.productId != itemId)

            deleteBtn.parentElement.parentElement.parentElement.parentElement.remove();
            saveCartItems();
            renderCheckoutHeader();
        })
    })
}