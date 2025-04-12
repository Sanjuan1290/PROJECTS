import { renderNavBar } from "../amazonScripts/header.js";
import { handlePlaceYourOrderClick } from '../checkoutScript/orderSummary.js';
import { getOrderedDate, getDeliveryDate } from '../../data/deliveryDate.js'
/*
    cart: cart,
    totalPrice: totalPrice,
    orderedDate: 
*/
export let orderedProduct = JSON.parse(localStorage.getItem('orderedProduct'));

orderedProduct ||= [];

window.addEventListener('DOMContentLoaded', ()=> {
    renderNavBar();
})
window.addEventListener('resize', renderNavBar)


export function saveOrderedProduct(){
    localStorage.setItem('orderedProduct', JSON.stringify(orderedProduct))
}


export function renderOrderedItems(){
    document.querySelector('.orderedItems-container').innerHTML =
    `
        <p class="your-orders-p">Your Orders</p>
    `;

    orderedProduct.forEach( orderItem => {

        document.querySelector('.orderedItems-container').innerHTML += 
    `
        <div class="ordered-item-list-container">

            <div class="top-section-container">
                <div class="top-section order-placed-container">
                    <p>Order Placed:</p>
                    <p>${orderItem.orderedDate}</p>
                </div>

                <div class="top-section total-container">
                    <p>Total:</p>
                    <p>$${orderItem.totalPrice.toFixed(2)}</p>
                </div>

                <div class="top-section order-id-container">
                    <p>Order ID:</p>
                    <p>f34655ab-3116-a150-550f-c64d55ac9cd2</p>
                </div>
            </div>

            <div class="mid-section-container">
                ${renderMid_Section(orderItem)}
            </div>

        </div>
    `;

    })
    

}

function renderMid_Section(orderItem){

    orderItem.cart.forEach( cartItem => {
        return `
        <div class="orderItems-container">
            <div class="image-container">
                <img src="${cartItem.image}">
            </div>

            <div class="item-data-container">
                <p>Black and Gray Athletic Cotton Socks - 6 Pairs</p>
                <p>Arriving on: ${getDeliveryDate(cartItem.deliveryPriceCents)}</p>
                <p>Quantitiy: 1</p>
                <button class="item-data-button">
                    <img src="./images/icons/buy-again.png">
                    <p>Buy it again</p>
                </button>
            </div>

            <div class="track-package-container">
                <button>Track package</button>
            </div>
        </div>

        <div class="orderItems-container">
            <div class="image-container">
                <img src="./images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
            </div>

            <div class="item-data-container">
                <p>Adults Plain Cotton T-Shirt - 2 Packs</p>
                <p>Arriving on: April 22</p>
                <p>Quantitiy: 1</p>
                <button class="item-data-button">
                    <img src="./images/icons/buy-again.png">
                    <p>Buy it again</p>
                </button>
            </div>

            <div class="track-package-container">
                <button>Track package</button>
            </div>
        </div>   

        <div class="orderItems-container">
            <div class="image-container">
                <img src="./images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg">
            </div>

            <div class="item-data-container">
                <p>Adults Plain Cotton T-Shirt - 2 Packs</p>
                <p>Arriving on: April 22</p>
                <p>Quantitiy: 1</p>
                <button class="item-data-button">
                    <img src="./images/icons/buy-again.png">
                    <p>Buy it again</p>
                </button>
            </div>

            <div class="track-package-container">
                <button>Track package</button>
            </div>

        </div>
    `
    });
}