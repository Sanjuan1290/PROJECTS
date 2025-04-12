import { renderNavBar } from "../amazonScripts/header.js";
import { handlePlaceYourOrderClick } from '../checkoutScript/orderSummary.js';

export let orderedProduct = JSON.parse(localStorage.getItem('orderedProduct'));

orderedProduct ||= [];

window.addEventListener('DOMContentLoaded', ()=> {
    renderNavBar();
})
window.addEventListener('resize', renderNavBar)


export function saveOrderedProduct(){
    localStorage.setItem('orderedProduct', JSON.stringify(orderedProduct))
}