import { cart } from '../cart.js';
 
export function getCartTotalQuantity(){
    let totalQuantity = 0;
    cart.forEact( item => {
        totalQuantity += item.quantity
    })

    return totalQuantity
}
export function getItemsTotalPrice(){
    let totalItemsPrice = 0;
    cart.forEact( item => {
        totalItemsPrice += (item.quantity * item.priceCents)
    })

    return totalItemsPrice
}
export function getShippingPrice(){

}
export function getPriceBeforeTax(){
    
}
export function getTaxPrice(){

}
export function getTotalPrice(){

}
