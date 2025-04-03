
let main_grid_elem = document.querySelector(`.main-grid`);

export function renderProducts(products){

    products.forEach((product) => {

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
                    
                    <select class="select-product-quantity">
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

                    <button class="add-to-cart-btn">Add to cart</button>
                </div>
            </div>
         `;
    });
}