import { products } from "../data/product.js";
import { renderNavBar } from "./amazonScripts/header.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
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

export function getCartTotalQuantity(){
    let quantity = 0;

    cart.forEach(item => {
        quantity += item.quantity
    })
    return quantity;
}

function saveCartItems(){
    localStorage.setItem('cart', JSON.stringify(cart))
}