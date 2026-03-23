// taking the operators div
let operators = document.querySelector('#operators')
// event delegation adding the listener
operators.addEventListener("click",(e)=>{
    e.preventDefault()
    // take the ids of numbers and result
    let x = document.querySelector("#number1")
    let y = document.querySelector("#number2")
    let res = document.querySelector("#res")
    // reload the textcontent to avoid previous answers
    res.textContent = "Answer: "
    if(e.target.classList.contains("addition")){
        // add the result and add it to the string
        let result = Number(x.value) + Number(y.value)
        res.textContent += result
    }
    else if(e.target.classList.contains("subtraction")){
        let result = Number(x.value) - Number(y.value)
        res.textContent += result
    }
    else if(e.target.classList.contains("multiplication")){
        let result = Number(x.value) * Number(y.value)
        res.textContent += result
    }
    else if(e.target.classList.contains("division")){
        // division by zero error
        if(y.value === "0"){
            alert("Division by zero error!")
            return
        }
        let result = Number(x.value) / Number(y.value)
        // round off to 2 decimals after .
        let rounded = result.toFixed(2)
        res.textContent += rounded
    }
})