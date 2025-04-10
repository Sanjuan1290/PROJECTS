import { cart } from '../cart.js';
 

export function renderOrderSummary(){
    document.querySelector('.order-summary-container').innerHTML = 
    `
        <p class="order-summary">Order Summary</p>

        <div class="price-calculation-container">
            <div>
                <p>Items (${getCartTotalQuantity()}):</p>
                <p>Shipping & handling:</p>
                <div class="price-line-1"></div>
                <p>Total before tax:</p>
                <p>Estimated tax (10%):</p>
            </div>
            <div>
                <p>$${getItemsTotalPrice()}</p>
                <p>$${getShippingPrice()}</p>
                <div class="price-line-2"></div>
                <p>$${getPriceBeforeTax().toFixed(2)}</p>
                <p>$${getTaxPrice().toFixed(2)}</p>
            </div>
        </div>

        <div class="price-line-3"></div>

        <div class="order-total-container">
            <p>Order total:</p>
            <p>$${getTotalPrice().toFixed(2)}</p>
        </div>

        <button class="place-your-order">Place your order</button>
    `
}

export function getCartTotalQuantity(){
    let totalQuantity = 0;
    cart.forEach( item => {
        totalQuantity += item.quantity
    })

    return totalQuantity
}
export function getItemsTotalPrice(){
    let totalItemsPrice = 0;
    cart.forEach( item => {
        totalItemsPrice += Number((item.quantity * item.priceCents) / 100);

    })

    return Number(totalItemsPrice.toFixed(2))
}
export function getShippingPrice(){
    let totalShippingPrice = 0;
    cart.forEach( item => {

        document.querySelectorAll(`input[name="option-${item.productId}"]`).forEach( radioBtn => {
            if(radioBtn.checked){
                totalShippingPrice += (Number(radioBtn.value) / 100)
            }
            radioBtn.removeEventListener('click', handleRadioBtnClick)
        })

        document.querySelectorAll(`input[name="option-${item.productId}"]`).forEach( radioBtn => {
            radioBtn.addEventListener('click', handleRadioBtnClick)
        })
    })
    
    return Number(totalShippingPrice.toFixed(2))
}
export function getPriceBeforeTax(){
    let totalPriceBeforeTax =  Number(getItemsTotalPrice() + getShippingPrice())
    return Number(totalPriceBeforeTax);
}
export function getTaxPrice(){
    return getPriceBeforeTax() * .10;
}
export function getTotalPrice(){
    return getPriceBeforeTax() + getTaxPrice()
}

function handleRadioBtnClick(){
    renderOrderSummary();
}