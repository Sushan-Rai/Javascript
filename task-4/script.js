let submit = document.querySelector('#submit')

submit.addEventListener('click', async (e) => {
    e.preventDefault()

    let city = document.querySelector("#city")
    let country = document.querySelector("#country")
    let weather = document.querySelector(".weather")
    let attrib = document.querySelector(".attributes")
    weather.textContent = ""
    attrib.textContent = ""

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&APPID=${CONFIG.API_KEY}`)

        const data = await response.json()

        if (!response.ok) {
            alert('Invalid: ' + data.message)
            return
        }

        weather_data = data.weather[0]
        weatherContext = weather_data["main"]
        descriptionContext = weather_data["description"]
        let break_ = document.createElement('br')
        let cityContext = document.createElement('p')
        cityContext.textContent = "City: " + city.value
        let countryContext = document.createElement('p')
        countryContext.textContent = "Country: " + country.value
        let textNode1 = document.createElement('p')
        textNode1.textContent = "Weather: "+ weatherContext
        let textNode2 = document.createElement('p')
        textNode2.textContent = "Description: "+ descriptionContext
        weather.appendChild(cityContext)
        weather.appendChild(break_)
        weather.appendChild(countryContext)
        weather.appendChild(break_)
        weather.appendChild(textNode1)
        weather.appendChild(break_)
        weather.appendChild(textNode2)

        attributes = data.main
        let i = 0;
        for (const key in attributes) {
            let element = undefined
            if (i < 4) {
                let celciusTemp = Number(attributes[key]) - 273
                let celc = celciusTemp.toFixed(2)
                element = document.createElement('p')
                element.textContent = `${key}: ${celc} Degrees Celcius`
            }
            else {
                element = document.createElement('p')
                element.textContent = `${key}: ${attributes[key]}`
            }
            attrib.appendChild(element)
            weather.appendChild(break_)
            i += 1
        }
    }
    catch {
        alert("Network error: Please try again")
    }

    city.value = ""
    country.value = ""
})