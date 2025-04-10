import { renderCheckoutHeader } from './header.js'
import { renderCartItems } from './itemInCart.js';
import { renderOrderSummary, handleRadioBtnClick } from './orderSummary.js';


renderCheckoutHeader();
renderCartItems();
renderOrderSummary();


handleRadioBtnClick();