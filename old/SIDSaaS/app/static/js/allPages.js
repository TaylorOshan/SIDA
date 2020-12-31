
/*******
Nav Bar Burger Code
*******/

let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function () {

    hamburger.classList.toggle("is-active");
    document.getElementById("navMenu").classList.toggle("hidden");

});