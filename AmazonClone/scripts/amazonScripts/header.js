
const navigation_elem = document.querySelector('.navigation');

let HTML_Computer = 
    `
    <nav>
        <div class="left-section">
                <img class="computer_imgIcon" src="./images/amazon-logo-white.png" alt="Amazon Logo">
            </div>

            <div class="mid-section">
                <input type="text" placeholder="Search">
                <img src="./images/icons/search-icon.png" alt="searchIcon">
            </div>

            <div class="right-section">
                <div class="returns_orders">
                    <p>Returns</p>
                    <p>& Orders</p>
                </div>

                <div class="cart">
                    <div class="cart-quantity">
                        <img src="./images/icons/cart-icon.png" alt="cart Icon">
                        <p>20</p>
                    </div>
                    
                    <p>Cart</p>
                </div>
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
                <input type="text" placeholder="Search">
                <img src="./images/icons/search-icon.png" alt="searchIcon">
            </div>
    
            <div class="right-section">
                <img class="burgerMenu" src="./images/icons/hamburger-menu.png" alt="burger Menu">
            </div>
        </nav>

        <div class="burger_click">
            <div class="return_orders_phone">
                <p>Returns & Orders</p>
            </div>

            <div class="cart_phone">
                <div>
                    <p>Cart (<span>20</span>)</p>
                </div>
            </div>
        </div>
    `;

function renderNavBar(){
    if(window.innerWidth <= 575){
        navigation_elem.innerHTML = HTML_Phone;
    }else{
        navigation_elem.innerHTML = HTML_Computer;
    }    
    
    const nav_elem = document.querySelector('nav');
    const burgerMenu_elem = document.querySelector('.burgerMenu');
    const return_orders_phone_elem = document.querySelector('.return_orders_phone')
    const cart_phone_elem = document.querySelector('.cart_phone')
    
    if (burgerMenu_elem) {
        burgerMenu_elem.addEventListener('click', function () {
            nav_elem.classList.toggle("navPhone");

            return_orders_phone_elem.classList.toggle('show');
            cart_phone_elem.classList.toggle('show');
        });
    }

}

renderNavBar();
window.addEventListener('resize', renderNavBar)