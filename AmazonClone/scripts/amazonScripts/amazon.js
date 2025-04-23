import { products } from '../../data/product.js';
import { renderNavBar } from "./header.js";
import { renderProducts} from "./main.js";


window.addEventListener('DOMContentLoaded', async ()=> {
    renderNavBar();
    
    renderProducts(await products);
})
window.addEventListener('resize', renderNavBar)




