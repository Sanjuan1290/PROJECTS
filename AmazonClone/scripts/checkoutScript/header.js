import { getCartTotalQuantity } from './orderSummary.js'

const js_header_elem = document.querySelector('.js-header');


export function renderCheckoutHeader(){
    if (!js_header_elem) return;
    let HTML_Window = 
    `
        <div class="left-section">
            <a href="./amazon.html"><img src="./images/amazon-logo.png"></a>
        </div>

        <div class="mid-section">
            <p>Checkout ( <a href="./amazon.html">${getCartTotalQuantity()} Items</a> )</p>
        </div>

        <div class="right-section">
            <img src="./images/icons/checkout-lock-icon.png">
        </div>
    `;
    let HTML_Phone = 
    `
        <div class="left-section">
            <a href="./amazon.html"><img class="logoSize" src="./images/amazon-mobile-logo.png"></a>
        </div>

        <div class="mid-section">
            <p>Checkout ( <a href="./amazon.html">${getCartTotalQuantity()} Items</a> )</p>
        </div>

        <div class="right-section">
            <img src="./images/icons/checkout-lock-icon.png">
        </div>
    `;

    if(window.innerWidth <= 575){
        js_header_elem.innerHTML = HTML_Phone
    }else{
        js_header_elem.innerHTML = HTML_Window
    }
}

window.addEventListener('resize', renderCheckoutHeader)