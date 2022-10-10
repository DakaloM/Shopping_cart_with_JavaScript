
// Cart

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick =  function() {
    cart.classList.add("active");
}

// Close Cart
closeCart.onclick = function() {
    cart.classList.remove("active");
}

// shoping Cart operations

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} 
else {
    ready();

}

// Creating the function
function ready() {
    // Remove items from the cart

    var removeCartButton = document.getElementsByClassName('cart-remove');
    console.log(removeCartButton);
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity changes
    var quantityInput = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quatityChanged);
    }

    // Add to cart

    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // Buy Button works
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}

// Buy button function
function buyButtonClicked(){
    alert("Yor order is placed")
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal()
}





 // add to cart function
 function addCartClicked(event) {
    var button = event.target
    var shopProduct = button.parentElement
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImage = shopProduct.getElementsByClassName('product-img')[0].src;
    
    addProductToCart(title, price, productImage);
    updatetotal();
 }


 function addProductToCart(title, price, productImage) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already added this product to your cart");
            return;
        }
    }

    var cartBoxContent = `
                        <img src="${productImage}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value = "1" class="cart-quantity">
                        </div>

                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove' ></i>
    `
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quatityChanged);
 }
// remove item from cart Function
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal()
}

// Quantity changes function
function quatityChanged(event) {
    var input = event.target
    // making sure the quantity is never zero or les
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal()
}

// Update Total Function
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace("R", ""));
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // If price contain decmals
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerHTML = "R" + total;
    
}