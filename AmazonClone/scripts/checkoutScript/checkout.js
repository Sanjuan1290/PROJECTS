import { renderCheckoutHeader } from './header.js'
import { renderCartItems } from './itemInCart.js';
import { renderOrderSummary, handleRadioBtnClick } from './orderSummary.js';

async function renderCheckOut(){

    renderCheckoutHeader();
    renderCartItems().then(()=>{
        renderOrderSummary();
    
        handleRadioBtnClick();
    });

}

renderCheckOut()