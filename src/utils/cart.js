export default function getCart() {
    let cart = localStorage.getItem("cart");
    // console.log(cart)

    if (cart == null) {
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        return []
    }

    cart = JSON.parse(cart)
    return cart
}

export function addToCart(product, qty) {
    let cart = getCart();

    const productIndex = cart.findIndex((prdct) => prdct.productId === product.productId);


    //-1 , index
    if (productIndex == -1) {
        cart.push(
            {
                productId: product.productId,
                name: product.name,
                altNames: product.altNames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                image: product.images[0],
                quantity: qty,
                tikIndex: {
                    index: product.productId,
                    isTiked: true
                }
            }
        )
    } else {
        cart[productIndex].quantity += qty
        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((prdct) => prdct.productId !== product.productId)
        }
    }



    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((product) => product.productId !== productId)
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}
export function gettTotal() {
    let cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.price * product.quantity
    })
    return total
}
export function getTotal(array) {
    let total = 0;
    array.forEach((product) => {
        total += product
    })
    // console.log(total)
    return total
}
export function getTotalForLabelledPrice() {
    let cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.labeledPrice * product.quantity
    })
    return total
}
export function isTiked(index, req) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].tikIndex.index == index) {
            cart[i].tikIndex.isTiked = req
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart

}

export function getTikedItemTotal() {
    let cart = getCart()
    let total = 0
    for (let i = 0; i < cart.length; i++) {

        if (cart[i].tikIndex.isTiked == true) {
            total += cart[i].price * cart[i].quantity
        }
    }
    return total.toFixed(2)

}
export function getTikedItemLabeledTotal() {
    let cart = getCart()
    let total = 0
    for (let i = 0; i < cart.length; i++) {

        if (cart[i].tikIndex.isTiked == true) {
            total += cart[i].labeledPrice * cart[i].quantity
        }
    }
    return total.toFixed(2)

}
export function getTikedItemDiscount() {
    let cart = getCart()
    let discount = 0
    for (let i = 0; i < cart.length; i++) {

        if (cart[i].tikIndex.isTiked == true) {
            discount += cart[i].labeledPrice * cart[i].quantity - cart[i].price * cart[i].quantity
        }
    }
    return discount.toFixed(2)

}
export function tikedAll(req) {
    let cart = getCart()
    for (let i = 0; i < cart.length; i++) {
        cart[i].tikIndex.isTiked = req
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}
export function getTikedItemImages() {
    let cart = getCart()
    let images =[]
    for (let i = 0; i < cart.length; i++) {

        if (cart[i].tikIndex.isTiked == true) {
            images.push(cart[i].image)
        }
    }
    return images

}
export function getTikedItemDiscountPercentage() {
    let cart = getCart()
    let discountPercentage = 0
    discountPercentage = (getTikedItemLabeledTotal() - getTikedItemTotal()) / getTikedItemLabeledTotal() * 100
    if(discountPercentage ==0){
        return 0
    }
    else{
        return discountPercentage.toFixed(2)
    }

}

