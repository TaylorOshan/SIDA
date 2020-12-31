window.onscroll = function () { scrollFunction() };

function scrollFunction() {

    let scrollTrigger = window.pageYOffset + document.getElementById("scrollMarker").getBoundingClientRect().top;

    let header = document.getElementById("header");

    if (document.body.scrollTop > scrollTrigger - 50 || document.documentElement.scrollTop > scrollTrigger - 50) {
        header.style.top = "0";
        //header.classList.remove("hidden");
    } else {
        //header.classList.add("hidden")
        header.style.top = "-72px";
    }
}