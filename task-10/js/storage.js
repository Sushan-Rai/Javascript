// use of localstorage saves the total and transaction
export const saveCart = (total) => {
    const orders = document.querySelector('.orders')
    localStorage.setItem('ordersHTML', orders.innerHTML)
    localStorage.setItem('total', total)
}
// loads it into the corresponding orders and items (count)
export const loadCart = (setTotal) => {
    const orders = document.querySelector('.orders')
    const gst = document.querySelector('#GST')
    const tot = document.querySelector("#total")
    const content = document.querySelector("#content")

    const savedOrders = localStorage.getItem('ordersHTML')
    const savedTotal = localStorage.getItem('total')

    if(savedOrders){
        orders.innerHTML = savedOrders

        const orderItems = orders.querySelectorAll('div')
        orderItems.forEach((item)=>{
            const className = item.classList[0]
            if(className === undefined){
                return
            }
            const countText = item.querySelector('.ref-count').innerHTML
            const count = Number(countText.slice(3))

            const productDiv = content.querySelector(`.${className}`)
            if(productDiv){
                const countDiv = productDiv.querySelector('.count')
                if(countDiv){
                    countDiv.innerHTML = count
                }
            }
        })
    }

    if(savedTotal){
        let total = Number(savedTotal)
        setTotal(total)

        let gstPrice = total * 0.09
        gst.innerHTML = `GST(9%): ${gstPrice.toFixed(2)}`
        tot.innerHTML = `Total: ${(total + gstPrice).toFixed(2)}`
    }
}