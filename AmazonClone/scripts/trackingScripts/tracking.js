import { renderNavBar } from "../amazonScripts/header.js";
import { orderedProduct } from '../return_ordersScripts/return_order.js'

const tracking_main_container_HTML = document.querySelector('.tracking-main-container')


window.addEventListener('DOMContentLoaded', ()=> {
    renderNavBar();
    renderTrackingDisplay();
})
window.addEventListener('resize', renderNavBar)


function renderTrackingDisplay(){
    const url = new URL(window.location.href);
    
    const orderId = url.searchParams.get("orderId")
    const itemId = url.searchParams.get("itemId")

    let productInfo = getList(orderId, itemId);
    tracking_main_container_HTML.innerHTML = 
    `
        <a href="./return_orders.html">View all orders</a>

        <h2>${productInfo.deliveryDate}</h2>
        <p class="tracking-order-name">${productInfo.name}</p>
        <p class="tracking-order-quantity">Quantity: ${productInfo.quantity}</p>

        <img src="${productInfo.image}">

        <div class="tracking-order-status">
            <p class="tracking-order-Preparing arriving-font-color">Preparing</p>
            <p class="tracking-order-Shipped">Shipped</p>
            <p class="tracking-order-Delivered">Delivered</p>

            <div class="tracking-order-arriving-bar-container">
                <div class="arriving-bar preparingStyle-bar"></div>
            </div>
        </div>
    `;
}

function getList(orderId, itemId){
    let image;
    let deliveryDate;
    let name;
    let quantity;

    orderedProduct.forEach(orderItem => {
        if(orderItem.orderId == orderId){
            orderItem.cart.forEach(cartItem => {
                if(cartItem.productId == itemId){
                    image = cartItem.image
                    deliveryDate = `${isDelivered(cartItem)} ${cartItem.deliveryDate}`
                    name = cartItem.name
                    quantity = cartItem.quantity
                    return
                }
            })
        }
    })

    return {image: image,
            deliveryDate: deliveryDate, 
            name: name, 
            quantity: quantity};
}


function isDelivered(cartItem) {
    const currentDate = new Date();
    const deliveryDateStr = cartItem.deliveryDate;

    const deliveryDate = new Date(`${deliveryDateStr}, ${currentDate.getFullYear()}`);


    if (currentDate > deliveryDate) {
        return 'Delivered on';
    } else {
        return 'Arriving on';
    }
}
