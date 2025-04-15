import { renderNavBar } from "../amazonScripts/header.js";

window.addEventListener('DOMContentLoaded', ()=> {
    renderNavBar();


})
window.addEventListener('resize', renderNavBar)


