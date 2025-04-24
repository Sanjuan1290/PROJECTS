import { addToCart } from '../cart.js';
let main_grid_elem = document.querySelector(`.main-grid`);

export function renderProducts(products){
    main_grid_elem.innerHTML = ``;
    products.forEach((product) => {

       if(!product.type){
            main_grid_elem.innerHTML +=     
            `
                <div class="content-container">

                    <div class="product-image-container"><img class="product-image" src="./${product.image}" alt="productImage"></div>

                    <div class="content-product">
                        <p class="product-name">${product.name}</p>

                        <div class="rating-container">
                            <img src="./images/ratings/rating-${product.rating.stars * 10}.png" alt="rating">
                            <p>${product.rating.count}</p>
                        </div>

                        <p class="product-price">$${(product.priceCents / 100).toFixed(2)}</p>
                        
                        <select class="select-product-quantity js-select-product-quantity-${product.id}">
                            <option value="1" selected>1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                            <option value="6" >6</option>
                            <option value="7" >7</option>
                            <option value="8" >8</option>
                            <option value="9" >9</option>
                            <option value="10" >10</option>
                        </select>

                        <div class="checkmark-added js-checkmark-added-${product.id}">
                            <img src="./images/icons/checkmark.png" alt="Checkmark">
                            <p>Added</p>
                        </div>

                        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to cart</button>
                    </div>
                </div>
            `;
        } else if(product.type == 'clothing'){
            main_grid_elem.innerHTML +=     
            `
                <div class="content-container">
    
                    <div class="product-image-container"><img class="product-image" src="./${product.image}" alt="productImage"></div>
    
                    <div class="content-product">
                        <p class="product-name">${product.name}</p>
    
                        <div class="rating-container">
                            <img src="./images/ratings/rating-${product.rating.stars * 10}.png" alt="rating">
                            <p>${product.rating.count}</p>
                        </div>
    
                        <p class="product-price">$${(product.priceCents / 100).toFixed(2)}</p>
                        
                        <select class="select-product-quantity js-select-product-quantity-${product.id}">
                            <option value="1" selected>1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                            <option value="6" >6</option>
                            <option value="7" >7</option>
                            <option value="8" >8</option>
                            <option value="9" >9</option>
                            <option value="10" >10</option>
                        </select>
    
                        <div class="checkmark-added js-checkmark-added-${product.id}">
                            <img src="./images/icons/checkmark.png" alt="Checkmark">
                            <p>Added</p>
                        </div>

                        <p class="clothSizeText">CLoth Size</p>

                        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to cart</button>
                    </div>
                </div>
             `;


            document.querySelector('body').add
        }
    });

    document.querySelectorAll(`.add-to-cart-btn`).forEach(btn => {


        btn.addEventListener('click' , () => { 
            const btn_productId = btn.dataset.productId;
            const quantity = Number(document.querySelector(`.js-select-product-quantity-${btn_productId}`).value);

            addToCart(btn_productId, quantity);
        })
        
    })

    handleWarrantyClick()
    showCheckMark();
}


function showCheckMark(){
    let timeoutMap = {};
    const js_add_to_cart_btn_elem = document.querySelectorAll('.add-to-cart-btn');
    js_add_to_cart_btn_elem.forEach(btn => {

        btn.addEventListener('click', ()=> {
            const btn_productId = btn.dataset.productId;

            let checkMark_added =  document.querySelector(`.js-checkmark-added-${btn_productId}`);
            checkMark_added.style.visibility = 'visible';

            if (timeoutMap[btn_productId]) {
                clearTimeout(timeoutMap[btn_productId]);
            }

            timeoutMap[btn_productId] = setTimeout(() => {
                checkMark_added.style.visibility = 'hidden';
            }, 1000)

        })
    })

    
}

let isClothSizeOpen = false;
function handleWarrantyClick(){
    document.querySelectorAll('.clothSizeText').forEach(warrant => {
        warrant.addEventListener('click', ()=>{

            if(isClothSizeOpen) return

            const clothImageContainer_elem = document.createElement('div')
            clothImageContainer_elem.classList.add('clothImageContainer')
    
            clothImageContainer_elem.innerHTML += `
                <button class="closeSizeImageBtn">X</button>
            `;
    
            const clothSizeImage = document.createElement('img')
            clothSizeImage.src = '././././images/instruction/clothingSize.png'
            clothSizeImage.classList.add('clothSize')
    
            clothImageContainer_elem.append(clothSizeImage)
    
            document.querySelector('body').append(clothImageContainer_elem)
    
            main_grid_elem.style.opacity = .5;
            
            document.querySelector('.closeSizeImageBtn').addEventListener('click' , ()=>{
                handleCloseSizeImageClick(clothImageContainer_elem)
            })

            isClothSizeOpen = true;
        })
    })
}


function handleCloseSizeImageClick(clothImageContainer_elem){
    main_grid_elem.style.opacity = 1;

    clothImageContainer_elem.remove()

    isClothSizeOpen = false;
}
