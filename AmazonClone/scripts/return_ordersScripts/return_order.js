import { renderNavBar } from "../amazonScripts/header.js";
import { getDeliveryDate } from '../../data/deliveryDate.js'
import { addToCart } from '../cart.js';
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


 function renderOrderedItems(){
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

    handleItemDateBtn();
}

function renderMid_Section(orderItem){
    let midSectionHTML = ``;
    orderItem.cart.forEach( cartItem => {
        midSectionHTML += `
        <div class="orderItems-container">
            <div class="image-container">
                <img src="${cartItem.image}">
            </div>

            <div class="item-data-container">
                <p>${cartItem.name}</p>
                <p>Arriving on: ${getDeliveryDate(cartItem.deliveryPriceCents)}</p>
                <p>Quantitiy: ${cartItem.quantity}</p>
                <button class="item-data-button" data-item-id="${cartItem.productId}">
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

    return midSectionHTML;
}
function handleItemDateBtn(){
    document.querySelectorAll('.item-data-button').forEach(btn => {
        const itemId = btn.dataset.itemId;

        btn.addEventListener('click', () => {
            addToCart(itemId, 1)
        })
    })
}
window.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.orderedItems-container')){
        renderOrderedItems();
    }
})