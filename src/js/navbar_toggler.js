const toggler = document.querySelector("#navbar-toggler");
const target = toggler.dataset.target;
toggler.addEventListener("click", ()=>{
    toggleClass(target);
});
function toggleClass(target){
    const elem = document.querySelector(target);
    elem.classList.toggle("toggler");
}
