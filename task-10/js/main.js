import { saveCart, loadCart } from './storage.js'
// get the products
const getProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products`)
    const data = await response.json()
    renderData(data.products);

    const categories = await fetch(`https://dummyjson.com/products/category-list`)
    const catData = await categories.json()
    renderCategories(catData)
}
// renders the items in content
const renderData = (data) => {
    const content = document.getElementById('content')
    content.innerHTML = ""

    data.forEach((item) => {
        const divElement = document.createElement('div')
        divElement.id = "item-" + item.id
        divElement.classList.add('product')

        const imgElement = document.createElement('img')
        imgElement.src = item.images[0]
        imgElement.style.width = '100%'
        divElement.appendChild(imgElement)

        const textElement = document.createElement('div')
        textElement.style.textAlign = 'center'
        textElement.innerHTML = `<h3 class="title">Name: ${item.title}</h3> <h4>Category: ${item.category}</h4> <h4 class="refPrice">Price: ${item.price} </h4> <h4 class="refDisc">Discount: ${item.discountPercentage}`
        divElement.appendChild(textElement)

        const AddorSubtract = document.createElement('div')
        AddorSubtract.classList.add('cartAdd')
        AddorSubtract.classList.add("item-" + item.id)

        const subtractFromCart = document.createElement('button')
        subtractFromCart.classList.add('subtract')
        subtractFromCart.innerHTML = '-'
        AddorSubtract.appendChild(subtractFromCart)

        AddorSubtract.innerHTML += `<h4 class="count">0</h4>`

        const AddtoCart = document.createElement('button')
        AddtoCart.classList.add('add')
        AddtoCart.innerHTML = '+'
        AddorSubtract.appendChild(AddtoCart)

        divElement.appendChild(AddorSubtract)

        divElement.style.display = 'flex'
        divElement.style.flexDirection = 'column'

        content.appendChild(divElement)
    })
    loadCart((val)=> total = val)
}
// renders categories in the dropdown
const renderCategories = (data) => {
    const ul = document.querySelector("#categories")
    ul.innerHTML = ""

    const all = document.createElement('option')
    all.value = "all"
    all.innerHTML = "All"
    ul.appendChild(all)

    data.forEach((item)=>{
        const li = document.createElement('option')
        li.innerHTML = item
        li.value = item
        ul.appendChild(li)
    })
}

let total = 0
// on click of content event delegation we check if its add or subtract take the corresponding item id and then add it to orders
const clickEvent = document.getElementById('content')
clickEvent.addEventListener('click', (e) => {
    e.preventDefault();
    const idRef = e.target.parentNode.classList[1]
    const ref = document.getElementById(idRef)

    let priceDiv = ref.querySelector('.refPrice')
    let discountDiv = ref.querySelector('.refDisc')

    let price = Number(priceDiv.innerHTML.slice(7))
    let discount = Number(discountDiv.innerHTML.slice(10))

    let priceTot = Number(price * (1 - (discount / 100)))

    if (e.target.classList.contains('add')) {
        const divPar = e.target.parentNode
        const div = divPar.querySelector('.count')
        const gst = document.querySelector('#GST')
        const tot = document.querySelector("#total")
        const orders = document.querySelector('.orders')

        if (div.innerHTML == 0) {
            const newDiv = document.createElement('div')
            newDiv.classList.add(idRef)
            newDiv.style.display = 'flex'
            newDiv.innerHTML = "<p>item: " + ref.querySelector('.title').innerHTML.slice(6, 11) + "...</p>" + "<p class='ref-count'>Q: " + String(Number(div.innerHTML)+1) +"</p>"
            orders.insertBefore(newDiv, gst)
        }
        else{
            const interRefPar = orders.querySelector('.'+idRef)
            const interRef = interRefPar.querySelector('.ref-count')
            interRef.innerHTML = interRef.innerHTML.slice(0,3) + String(Number(div.innerHTML) + 1)
        }

        div.innerHTML = String(Number(div.innerHTML) + 1)

        total += priceTot

        let gstPrice = total * 0.09
        const display = (total + gstPrice).toFixed(2)

        gst.innerHTML = `GST(9%): ${gstPrice.toFixed(2)}`
        tot.innerHTML = `Total: ${display}`

        saveCart(total)
    }

    if (e.target.classList.contains('subtract')) {
        const divPar = e.target.parentNode
        const div = divPar.querySelector('.count')
        const gst = document.querySelector('#GST')
        const tot = document.querySelector("#total")
        const orders = document.querySelector('.orders')

        if (Number(div.innerHTML) == 0) {
            return
        }

        if (Number(div.innerHTML) == 1) {
            const interRefPar = orders.querySelector('.'+idRef)
            interRefPar.remove()
        }
        else{
            const interRefPar = orders.querySelector('.'+idRef)
            const interRef = interRefPar.querySelector('.ref-count')
            interRef.innerHTML = interRef.innerHTML.slice(0,3) + String(Number(div.innerHTML) - 1)
        }

        div.innerHTML = String(Number(div.innerHTML) - 1)

        total -= priceTot

        let gstPrice = total * 0.09
        const display = (total + gstPrice).toFixed(2)

        gst.innerHTML = `GST(9%): ${gstPrice.toFixed(2)}`
        tot.innerHTML = `Total: ${display}`

        saveCart(total)
    }
})
// on change of dropdown the content is changed by querying through the api
let filterCategory = document.querySelector('#categories')
filterCategory.addEventListener('change', async(e)=>{
    const selectedValue = e.target.value

    if(selectedValue === "all"){
        getProducts()
        return
    }

    const categories = await fetch(`https://dummyjson.com/products/category/${selectedValue}`)
    const catData = await categories.json()
    renderData(catData.products)
})

window.onload = getProducts