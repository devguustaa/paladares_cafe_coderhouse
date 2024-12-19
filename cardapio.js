if (document.readyState = "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
} 

function ready() {
    const removeProdct = document.getElementsByClassName("btn_remove")  
    for (var i = 0; i < removeProdct.length; i++) {
        removeProdct[i].addEventListener("click", removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product_qtd")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName("btn_carrinho")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("btn_finalizar")[0]
    purchaseButton.addEventListener("click", makePurchase)

    function makePurchase() {
        let nome = prompt("Qual o seu nome?")
        let mesa = prompt("E qual o número de sua mesa?")
        sessionStorage.setItem("cliente", nome)
        sessionStorage.setItem("mesa", mesa)   
        alert ('Obrigado pela sua compra')

        document.querySelector(".cart_table tbody").innerHTML = ""
        updateTotal()
    }

function checkIfInputIsNull(event) {
    if (event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }


    updateTotal()
}

}

function addProductToCart(event) {
    const button = event.target 
    const productInfos = button.parentElement
    const productImage = productInfos.getElementsByClassName("card_image")[0].src
    const productTitle = productInfos.getElementsByClassName("card_title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("card_preco")[0].innerText

 
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart_product")

    newCartProduct.innerHTML = 
    `
    <td class="product_identification">
        <img class="product_image" src="${productImage}" alt="${productTitle}">
        <strong class="product_title">${productTitle}</strong>
    </td>
    <td>
        <span class="product_price">${productPrice}</span>
    </td>
    <td>
        <input class="product_qtd" type="number" value="1" min="0">
        <button type="button" class="btn_remove">Remover</button>
    </td>

    `

    const tableBody =  document.querySelector(".cart_table tbody")
    tableBody.append(newCartProduct)    

    updateTotal()
    newCartProduct.getElementsByClassName("product_qtd")[0].addEventListener("change", updateTotal)
    newCartProduct.getElementsByClassName("btn_remove")[0].addEventListener("click", removeProduct)
}


function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}


function updateTotal (){
    let totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart_product") 
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = cartProducts[i].getElementsByClassName("product_price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product_qtd")[0].value
    
        totalAmount += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".total_container span").innerText = "R$" + totalAmount
}