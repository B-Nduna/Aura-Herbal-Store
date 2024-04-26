var MenuItems = document.getElementById("MenuItems");
    MenuItems.style.maxHeight = "0px";

    function menutoggle(){
        if(MenuItems.style.maxHeight == "0px")
        {
        MenuItems.style.maxHeight = "200px";
        }
        else
        {
        MenuItems.style.maxHeight = "0px";
        }
    }




let cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    cartElement.innerHTML = '';
    total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R${item.price}`;
        cartElement.appendChild(li);
        total += item.price;
    });
    totalElement.textContent = total;
}
