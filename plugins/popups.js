const popup = {
    name: 'popup',
    closePopup() {

        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("popup-opened")) {
                document.getElementById("app").classList.remove("popup-opened");
                return;
            }

        });
    }
}

export default ({ app }, inject) => {
    inject('popup', popup)
}