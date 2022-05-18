// export default (context, inject) => {
//     const closePopup = (msg) => console.log(`Hello ${msg}!`)
//         // Inject $hello(msg) in Vue, context and store.
//     inject('hello', closePopup)
// }

const popup = {
    name: 'popup',
    closePopup() {

        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("popup-opened")) {
                document.getElementById("app").classList.remove("popup-opened");
                return;
            }
            // if (event.target.classList.contains("popup")) {
            //     event.target.style.display = "none";
            //     return;
            // }
        });
    }
}

export default ({ app }, inject) => {
    inject('popup', popup)
}