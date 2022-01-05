// update each item
const updateItem = (item, unitPrice, step) => {
    let price = item.getElementsByClassName('order-price')[0].innerText.slice(0, 2)
    let amount = item.getElementsByClassName('order-amount')[0].value
    const newAmount = Number(amount) + step
    const newPrice = unitPrice * newAmount
        // item.getElementsByClassName('order-price')[0].innerText = newPrice + '$'
    item.getElementsByClassName('order-amount')[0].value = newAmount
    if (newAmount === 0) item.remove()
    return newAmount
}

// update the total order modal
const updateTotal = () => {
    /*const items = Array.from(document.getElementsByClassName('order-item'))
    const totalAmount = items.length
    const totalPrice = items.reduce((total, item) => {
        let price = item.getElementsByClassName('order-price')[0].innerText.slice(0, 2)
        return total + Number(price)
    }, 0)

    document.getElementsByClassName('total-amount')[0].innerText = totalAmount
    document.getElementsByClassName('total-price')[0].innerText = totalPrice + '$'
    document.getElementsByClassName('btn-confirm')[0].disabled = totalAmount === 0
    document.getElementsByClassName('btn-floating')[0]
        .getElementsByTagName('span')[0].innerText = totalAmount
    document.getElementsByClassName('btn-floating')[0].disabled = totalAmount === 0
    */
    const amouts = document.getElementsByClassName("order-amount");
    const prices = document.getElementsByClassName("order-price");
    var totalAmount = 0;
    var totalPrice = 0;
    for (let i = 0; i < amouts.length; i++) {
        const priceElement = prices[i].innerHTML;
        const price = priceElement.substring(0, priceElement.length - 1);
        totalAmount += parseInt(amouts[i].value);
        totalPrice += parseInt(price) * parseInt(amouts[i].value);

    }
    document.getElementById("total-amount").innerHTML = totalAmount;
    document.getElementById("total-price").innerHTML = String(totalPrice) + "$";

}

const items = Array.from(document.getElementsByClassName('order-item'))

items.map(item => {
    const btnDecrease = item.getElementsByClassName('btn-decrease')[0]
    const btnIncrease = item.getElementsByClassName('btn-increase')[0]
    const unitPrice = 50
    btnDecrease.onclick = (event) => {
        event.preventDefault()
        updateItem(item, unitPrice, -1)
        updateTotal()
    }
    btnIncrease.onclick = (event) => {
        event.preventDefault()
        updateItem(item, unitPrice, 1)
        updateTotal()
    }
})
updateTotal()