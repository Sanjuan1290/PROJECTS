import { products } from "../data/product.js";

let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    priceCents: 1090,
    quantity: 1
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    priceCents: 2095,
    quantity: 3
}];


export function addToCart(productId, quantity){

    products.forEach(product => {
        if(product.id == productId){

            const existingItem = cart.find(item => productId == item.productId)

            if(existingItem){
                existingItem.quantity += quantity;
            }else{
                cart.push({
                    productId: product.id,
                    priceCents: product.priceCents,
                    quantity: quantity
                })
            }
        }
    })

    console.log(cart);
}