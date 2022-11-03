const object = {
    "energySource": "Embridge",
    "houseIncome": 25000,
}

object["marsbar"] = "yum"

console.log(object)

// get the existing div
const wrapper = document.querySelector("#wrapper")

// change the div html to the users energy source
wrapper.innerHTML = object.energySource

// change the household income
const income = document.createElement("div")
income.innerHTML = object.houseIncome

// render the income div
wrapper.appendChild(income)

const button = document.createElement("button")
button.innerHTML = "Click me"
button.addEventListener("click", myScript);

function myScript(){
    object.houseIncome += 5000
    console.log(object.houseIncome)
    income.innerHTML = object.houseIncome
}

wrapper.appendChild(button)


// console.log(object.houseIncome)