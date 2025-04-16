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
                <div class="arriving-bar"></div>
            </div>
        </div>
    `;

    renderStatusBar(productInfo.status);
}

function getList(orderId, itemId){
    let image;
    let deliveryDate;
    let name;
    let quantity;
    let status;

    orderedProduct.forEach(orderItem => {
        if(orderItem.orderId == orderId){
            orderItem.cart.forEach(cartItem => {
                if(cartItem.productId == itemId){
                    image = cartItem.image
                    deliveryDate = `${isDelivered(cartItem)} ${cartItem.deliveryDate}`
                    name = cartItem.name
                    quantity = cartItem.quantity
                    status = checkOrderStatus(cartItem)
                    return
                }
            })
        }
    })

    return {image: image,
            deliveryDate: deliveryDate, 
            name: name, 
            quantity: quantity,
            status: status};
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

function checkOrderStatus(cartItem) {
    const currentDate = new Date();
    const deliveryDate = new Date(`${cartItem.deliveryDate}, ${currentDate.getFullYear()}`);

    const timeDiff = deliveryDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let deliveryNumberDays;
    if (cartItem.deliveryPriceCents == 0) {
        deliveryNumberDays = 10;
    } else if (cartItem.deliveryPriceCents == 499) {
        deliveryNumberDays = 7;
    } else if (cartItem.deliveryPriceCents == 999) {
        deliveryNumberDays = 3;
    }

    const shipThreshold = deliveryNumberDays - Math.floor(deliveryNumberDays / 3);

    if (daysLeft > shipThreshold) {
        return 'Preparing';
    } else if (daysLeft > 0 && daysLeft <= shipThreshold) {
        return 'Shipped';
    } else {
        return 'Delivered';
    }
}

function renderStatusBar(status){
    const arriving_bar_elem = document.querySelector('.arriving-bar');

    arriving_bar_elem.classList.remove('preparingStyle-bar', 'shippedStyle-bar', 'Delivered-bar')

    setTimeout(() => {
        if(status == 'Preparing'){
            arriving_bar_elem.classList.add('preparingStyle-bar')
        }else if(status == 'Shipped'){
            arriving_bar_elem.classList.add('shippedStyle-bar')
        }
        else if(status == 'Delivered'){
            arriving_bar_elem.classList.add('Delivered-bar')
        }
    }, 50)
}
