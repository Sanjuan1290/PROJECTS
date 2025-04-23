import {getCartTotalQuantity} from '../checkoutScript/orderSummary.js'
import { products } from '../../data/product.js';
import { renderProducts } from '../amazonScripts/main.js'

const navigation_elem = document.querySelector('.navigation');
const navigation_order_return_elem = document.querySelector('.navigation-order-return');
const navigation_tracking_elem = document.querySelector('.navigation-tracking');



export function renderNavBar(){
    let HTML_Computer = 
    `
    <nav>
        <div class="left-section">
                <a href="./././amazon.html">
                    <img class="computer_imgIcon" src="./images/amazon-logo-white.png" alt="Amazon Logo">
                </a>
            </div>

            <div class="mid-section">
                <input type="text" placeholder="Search" class="searchInput">
                <img src="./images/icons/search-icon.png" alt="searchIcon">
            </div>

            <div class="right-section">
                <a href="./././return_orders.html">
                    <div class="returns_orders">
                        <p>Returns</p>
                        <p>& Orders</p>
                    </div>
                </a>

                <a href="./././checkout.html" class="">
                    <div class="cart">
                        <div class="cart-quantity">
                            <img src="./images/icons/cart-icon.png" alt="cart Icon">
                            <p>${getCartTotalQuantity()}</p>
                        </div>
                        
                        <p>Cart</p>
                    </div>
                </a>
            </div>
        </nav>
    `;
    let HTML_Phone = 
    `
        <nav>
            <div class="left-section">
                <img class="phone_imgIcon" src="./images/amazon-mobile-logo-white.png" alt="Amazon Logo">
            </div>

            <div class="mid-section">
                <input type="text" placeholder="Search" class="searchInput">
                <img src="./images/icons/search-icon.png" alt="searchIcon">
            </div>

            <div class="right-section">
                <img class="burgerMenu" src="./images/icons/hamburger-menu.png" alt="burger Menu">
            </div>
        </nav>

        <div class="burger_click">
            <a href="./././return_orders.html" class="link-checkout">
                <div class="return_orders_phone">
                    <p>Returns & Orders</p>
                </div>
            </a>


            <a href="./././checkout.html" class="link-checkout">
                <div class="cart_phone">
                    <div>
                        <p>Cart (<span>${getCartTotalQuantity()}</span>)</p>
                    </div>
                </div>
            </a>
        </div>
    `;

    if(window.innerWidth <= 575 || window.innerWidth <= 630){
        if(navigation_elem){
            navigation_elem.innerHTML = HTML_Phone;
        }else if(navigation_order_return_elem){
            navigation_order_return_elem.innerHTML = HTML_Phone;
        }else if(navigation_tracking_elem){
            navigation_tracking_elem.innerHTML = HTML_Phone;;
        }
    }else{
        if(navigation_elem){
            navigation_elem.innerHTML = HTML_Computer;
        }else if(navigation_order_return_elem){
            navigation_order_return_elem.innerHTML = HTML_Computer;
        }else if(navigation_tracking_elem){
            navigation_tracking_elem.innerHTML = HTML_Computer;
        }
    }    
    
    handleSearchInput();
    const nav_elem = document.querySelector('nav');
    const burgerMenu_elem = document.querySelector('.burgerMenu');
    const link_checkout_elem = document.querySelectorAll('.link-checkout')
    
    if (burgerMenu_elem) {
        burgerMenu_elem.addEventListener('click', function () {
            nav_elem.classList.toggle("navPhone");

            link_checkout_elem[0].classList.toggle('show');
            link_checkout_elem[1].classList.toggle('show');
        });
    }

}


function handleSearchInput(){
    const main_grid_elem = document.querySelector(`.main-grid`);
    const searchInput_elem = document.querySelector(`.searchInput`);

    if(!searchInput_elem){
        return
    }

    searchInput_elem.addEventListener('keydown', async (event) => {

        if(event.key == 'Enter'){
            let input = searchInput_elem.value.toLowerCase();

            let productsList = await products;
            let searchedProducts =  productsList.filter(product => {
                const keywords = product.keywords
                
                for(let keyword of keywords){
                    if(input == keyword.toLowerCase()){

                        return true
                    }
                }
                return product.name.toLowerCase().includes(input)
            })
            
            if(searchedProducts.length != 0){
                renderProducts(searchedProducts)
            }else{
                main_grid_elem.innerHTML = `<h3 style="margin: 10px 0px 0px 10px">Item does not exist!</h3>`;
            }
        }

    })
}