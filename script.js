//cart array to store cart items
let cart = new Array;
//stored list of pizza
const pizzaList = new Array;
//parental element for pizza list
const pizzaListGridContainer = document.getElementById("grid-container");
//parental element for categories
const foodCategoryNav = document.getElementById("food-category-nav");
const chosenCategory = document.getElementById("chosen-category");
const availableFoodAmount = document.getElementById("available-food-amount");
const orderAmount = document.getElementById("order-amount");
const clearOrderButton = document.getElementById("clear-order");
const orderPrice = document.getElementById("order-price");
//parental element for cart items
const asideSection = document.getElementById("aside-section");

//read list of pizza from json file

async function fetchJSONData() {
    const response = await fetch("data.json");
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    pizzaList.push(...data);
}

async function main() {
    try {
        await fetchJSONData();
        console.log(pizzaList);
        for (let pizza of pizzaList) {
            appendPizza(pizza);
        }
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
}

main();

// reading items from local storage

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    console.log(`${key}: ${localStorage.getItem(key)}`);
    cart = JSON.parse(localStorage.user);
    for (let i = 0; i < cart.length; i++) {
        appendItem(cart[i]);
    }
    updateOrderAmount();
    updateOrderPrice();
}

function appendPizza(pizza) {
    const fragment = document.createDocumentFragment();

    const foodDiv = document.createElement("div");
    foodDiv.classList.add("food-div");
    if (pizza.is_new) {
        foodDiv.classList.add("new");
    } else if (pizza.is_popular) {
        foodDiv.classList.add("popular");
    }
    foodDiv.id = pizza.id;

    const foodDivPicture = document.createElement("picture");
    foodDivPicture.classList.add("food-div-picture");
    const foodDivImg = document.createElement("img");
    foodDivImg.src = pizza.icon;
    foodDivImg.alt = pizza.title;
    foodDivPicture.appendChild(foodDivImg);
    foodDiv.appendChild(foodDivPicture);

    const foodDivName = document.createElement("div");
    foodDivName.classList.add("food-div-name");
    foodDivName.textContent = pizza.title;
    foodDiv.appendChild(foodDivName);

    const foodDivCategory = document.createElement("div");
    foodDivCategory.classList.add("food-div-category");
    foodDivCategory.textContent = pizza.type;
    foodDiv.appendChild(foodDivCategory);

    const foodDivDescription = document.createElement("div");
    foodDivDescription.classList.add("food-div-description");
    foodDivDescription.textContent = createContentString(pizza.content);
    foodDiv.appendChild(foodDivDescription);

    const foodDivGridContainer = document.createElement("div");
    foodDivGridContainer.classList.add("food-div-grid-container");

    const foodDivSmall = document.createElement("div");
    foodDivSmall.classList.add("food-div-small");

    const foodDivSmallUpper = document.createElement("div");

    const foodDivDiameter = document.createElement("div");
    foodDivDiameter.classList.add("food-div-diameter");

    const foodDivDiameterPicture = document.createElement("picture");
    const foodDivDiameterImg = document.createElement("img");
    foodDivDiameterImg.src = "assets/size-icon.svg";
    foodDivDiameterImg.alt = "diameter";
    foodDivDiameterPicture.appendChild(foodDivDiameterImg);
    foodDivDiameter.appendChild(foodDivDiameterPicture);

    const diameterText = document.createTextNode(pizza.small_size.size);
    foodDivDiameter.appendChild(diameterText);


    foodDivSmallUpper.appendChild(foodDivDiameter);

    const foodDivWeight = document.createElement("div");
    foodDivWeight.classList.add("food-div-weight");

    const foodDivWeightPicture = document.createElement("picture");
    const foodDivWeightImg = document.createElement("img");
    foodDivWeightImg.src = "assets/weight.svg";
    foodDivWeightImg.alt = "weight";
    foodDivWeightPicture.appendChild(foodDivWeightImg);
    foodDivWeight.appendChild(foodDivWeightPicture);

    const weightText = document.createTextNode(pizza.small_size.weight);
    foodDivWeight.appendChild(weightText);


    foodDivSmallUpper.appendChild(foodDivWeight);

    foodDivSmall.appendChild(foodDivSmallUpper);

    const foodDivSmallLower = document.createElement("div");

    const foodDivPrice = document.createElement("div");
    foodDivPrice.classList.add("food-div-price");

    const priceText = document.createTextNode(pizza.small_size.price);
    foodDivPrice.appendChild(priceText);
    foodDivSmallLower.appendChild(foodDivPrice);

    const foodDivUah = document.createElement("div");
    foodDivUah.classList.add("food-div-uah");
    foodDivUah.textContent = "грн";
    foodDivSmallLower.appendChild(foodDivUah);

    const foodDivSmallButton = document.createElement("button");
    foodDivSmallButton.classList.add("food-div-button");
    foodDivSmallButton.classList.add("food-div-button-small");
    foodDivSmallButton.textContent = "Купити";
    foodDivSmallLower.appendChild(foodDivSmallButton);
    
    foodDivSmall.appendChild(foodDivSmallLower);


    foodDivGridContainer.appendChild(foodDivSmall);

    const foodDivBig = document.createElement("div");
    foodDivBig.classList.add("food-div-big");

    const foodDivBigUpper = document.createElement("div");

    const foodDivBigDiameter = document.createElement("div");
    foodDivBigDiameter.classList.add("food-div-diameter");

    const foodDivBigDiameterPicture = document.createElement("picture");
    const foodDivBigDiameterImg = document.createElement("img");
    foodDivBigDiameterImg.src = "assets/size-icon.svg";
    foodDivBigDiameterImg.alt = "diameter";
    foodDivBigDiameterPicture.appendChild(foodDivBigDiameterImg);
    foodDivBigDiameter.appendChild(foodDivBigDiameterPicture);

    const diameterBigText = document.createTextNode(pizza.big_size.size);
    foodDivBigDiameter.appendChild(diameterBigText);


    foodDivBigUpper.appendChild(foodDivBigDiameter);

    const foodDivBigWeight = document.createElement("div");
    foodDivBigWeight.classList.add("food-div-weight");

    const foodDivBigWeightPicture = document.createElement("picture");
    const foodDivBigWeightImg = document.createElement("img");
    foodDivBigWeightImg.src = "assets/weight.svg";
    foodDivBigWeightImg.alt = "weight";
    foodDivBigWeightPicture.appendChild(foodDivBigWeightImg);
    foodDivBigWeight.appendChild(foodDivBigWeightPicture);

    const weightBigText = document.createTextNode(pizza.big_size.weight);
    foodDivBigWeight.appendChild(weightBigText);


    foodDivBigUpper.appendChild(foodDivBigWeight);

    foodDivBig.appendChild(foodDivBigUpper);

    const foodDivBigLower = document.createElement("div");

    const foodDivBigPrice = document.createElement("div");
    foodDivBigPrice.classList.add("food-div-price");

    const priceBigText = document.createTextNode(pizza.big_size.price);
    foodDivBigPrice.appendChild(priceBigText);
    foodDivBigLower.appendChild(foodDivBigPrice);

    const foodDivBigUah = document.createElement("div");
    foodDivBigUah.classList.add("food-div-uah");
    foodDivBigUah.textContent = "грн";
    foodDivBigLower.appendChild(foodDivBigUah);

    const foodDivBigButton = document.createElement("button");
    foodDivBigButton.classList.add("food-div-button");
    foodDivBigButton.classList.add("food-div-button-big");
    foodDivBigButton.textContent = "Купити";
    foodDivBigLower.appendChild(foodDivBigButton);
    
    foodDivBig.appendChild(foodDivBigLower);

    foodDivGridContainer.appendChild(foodDivBig);

    foodDiv.appendChild(foodDivGridContainer);

    //click event for buy buttons
    foodDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains("food-div-button-small")) {
            handleBuyButton(pizza, true);
        } else if (event.target.classList.contains("food-div-button-big")) {        
            handleBuyButton(pizza, false);
        }
    });

    fragment.appendChild(foodDiv);
    pizzaListGridContainer.appendChild(fragment);
}

//create string of ingredients

function createContentString(content) {
    let ingredients = [];
    for (let key in content) {
        if (content.hasOwnProperty(key)) {
            ingredients.push(...content[key]);
        }
    }
    return ingredients.join(", ");
}

//handle buy button click

function handleBuyButton(pizza, isSmall) {
    if (!checkForExistInCart(pizza, isSmall)) {
        let item = {
            pizza,
            isSmall,
            quantity: 1,
        }
        cart.push(item);
        appendItem(item);
        localStorage.user = JSON.stringify(cart);
    } else {
        for (let item of cart) {
            if (item.pizza.id == pizza.id && item.isSmall === isSmall) {
                item.quantity++;
                document.getElementById(`${item.pizza.id}-${item.isSmall}`).querySelector(".info-amount").textContent = item.quantity;
                localStorage.user = JSON.stringify(cart);
            }
        }
    }
    updateOrderAmount();
    updateOrderPrice();
}

function checkForExistInCart(pizza, isSmall) {
    for (let item of cart) {
        if (item.pizza.id == pizza.id && item.isSmall === isSmall) {
            return true;
        }
    }
    return false;
}

// add item to DOM and add elem reference to cart array

function appendItem(item) {
    const fragment = document.createDocumentFragment();

    const orderPreview = document.createElement("div");
    orderPreview.classList.add("order-preview");
    orderPreview.id = `${item.pizza.id}-${item.isSmall}`;

    const orderInfo = document.createElement("div");
    orderInfo.classList.add("order-info");
    if (item.isSmall) {
        orderInfo.classList.add("small");
    } else {
        orderInfo.classList.add("big");
    }

    const infoName = document.createElement("div");
    infoName.classList.add("info-name");
    infoName.textContent = item.pizza.title;
    orderInfo.appendChild(infoName);

    const infoMassDiv = document.createElement("div");
    infoMassDiv.classList.add("info-mass-div");

    const sizeIconPicture = document.createElement("picture");
    const sizeIconImg = document.createElement("img");
    sizeIconImg.src = "assets/size-icon.svg";
    sizeIconImg.alt = "diameter";
    sizeIconPicture.appendChild(sizeIconImg);
    infoMassDiv.appendChild(sizeIconPicture);

    const infoDiameter = document.createElement("div");
    infoDiameter.classList.add("info-diameter");
    infoDiameter.textContent = item.isSmall ? item.pizza.small_size.size : item.pizza.big_size.size;
    infoMassDiv.appendChild(infoDiameter);

    const weightIconPicture = document.createElement("picture");
    const weightIconImg = document.createElement("img");
    weightIconImg.src = "assets/weight.svg";
    weightIconImg.alt = "weight";
    weightIconPicture.appendChild(weightIconImg);
    infoMassDiv.appendChild(weightIconPicture);

    const infoWeight = document.createElement("div");
    infoWeight.classList.add("info-weight");
    infoWeight.textContent = item.isSmall ? item.pizza.small_size.weight : item.pizza.big_size.weight;
    infoMassDiv.appendChild(infoWeight);

    orderInfo.appendChild(infoMassDiv);

    const infoAmountControls = document.createElement("div");
    infoAmountControls.classList.add("info-amount-controls");

    const infoPrice = document.createElement("div");
    infoPrice.classList.add("info-price");
    infoPrice.textContent = item.isSmall ? item.pizza.small_size.price : item.pizza.big_size.price;
    infoAmountControls.appendChild(infoPrice);

    const infoButtonMinus = document.createElement("button");
    infoButtonMinus.classList.add("info-button-minus");
    infoButtonMinus.textContent = "-";
    infoAmountControls.appendChild(infoButtonMinus);

    const infoAmount = document.createElement("div");
    infoAmount.classList.add("info-amount");
    infoAmount.textContent = item.quantity;
    infoAmountControls.appendChild(infoAmount);

    const infoButtonPlus = document.createElement("button");
    infoButtonPlus.classList.add("info-button-plus");
    infoButtonPlus.textContent = "+";
    infoAmountControls.appendChild(infoButtonPlus);

    const infoButtonDelete = document.createElement("button");
    infoButtonDelete.classList.add("info-button-delete");
    infoButtonDelete.textContent = "x";
    infoAmountControls.appendChild(infoButtonDelete);

    // click event for amount controls

    infoAmountControls.addEventListener('click', function (event) {
        if (event.target.classList.contains("info-button-minus")) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].pizza.id == item.pizza.id && cart[i].isSmall === item.isSmall) {
                    cart[i].quantity--;
                    if (cart[i].quantity === 0) {
                        cart.splice(i, 1);
                        orderPreview.remove();
                    } else {
                        infoAmount.textContent = cart[i].quantity;
                    }
                }
            }
        } else if (event.target.classList.contains("info-button-plus")) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].pizza.id == item.pizza.id && cart[i].isSmall === item.isSmall) {
                    cart[i].quantity++;
                    infoAmount.textContent = cart[i].quantity;
                }
            }
        } else if (event.target.classList.contains("info-button-delete")) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].pizza.id == item.pizza.id && cart[i].isSmall === item.isSmall) {
                    cart.splice(i, 1);
                    orderPreview.remove();
                }
            }
        }
        updateOrderAmount();
        updateOrderPrice();
        localStorage.user = JSON.stringify(cart);
    });

    orderInfo.appendChild(infoAmountControls);
    
    orderPreview.appendChild(orderInfo);
    
    const infoPicture = document.createElement("picture");
    infoPicture.classList.add("info-picture");
    const infoImg = document.createElement("img");
    infoImg.src = item.pizza.icon;
    infoImg.alt = item.pizza.title;
    infoPicture.appendChild(infoImg);
    orderPreview.appendChild(infoPicture);

    fragment.appendChild(orderPreview);
    asideSection.appendChild(fragment);
}

//handle changing category

foodCategoryNav.addEventListener('click', function (event) {
    if (event.target.id === "all-radio"){
        removeHiddenClass();
        chosenCategory.textContent = "Усі піци";
        updateAvailableFoodAmount();
    } else if (event.target.id === "meat-radio") {
        removeHiddenClass();
        [...pizzaListGridContainer.children].forEach(child => {
            let id = parseInt(child.id);
            if(!pizzaList.find(elem => elem.id == id).content.meat) {
                child.classList.add("hidden");
            }
        });
        chosenCategory.textContent = "М'ясні піци";
        updateAvailableFoodAmount();
    } else if (event.target.id === "pineapple-radio") {
        removeHiddenClass();
        [...pizzaListGridContainer.children].forEach(child => {
            let id = parseInt(child.id);
            if(!pizzaList.find(elem => elem.id == id).content.pineapple) {
                child.classList.add("hidden");
            }
        });
        chosenCategory.textContent = "Піци з ананасами";
        updateAvailableFoodAmount();
    } else if (event.target.id === "mushroom-radio") {
        removeHiddenClass();
        [...pizzaListGridContainer.children].forEach(child => {
            let id = parseInt(child.id);
            if(!pizzaList.find(elem => elem.id == id).content.mushroom) {
                child.classList.add("hidden");
            }
        });
        chosenCategory.textContent = "Піци з грибами";
        updateAvailableFoodAmount();
    } else if (event.target.id === "seafood-radio") {
        removeHiddenClass();
        [...pizzaListGridContainer.children].forEach(child => {
            let id = parseInt(child.id);
            if(!pizzaList.find(elem => elem.id == id).content.ocean) {
                child.classList.add("hidden");
            }
        });
        chosenCategory.textContent = "Морські піци";
        updateAvailableFoodAmount();
    } else if (event.target.id === "vegan-radio") {
        removeHiddenClass();
        [...pizzaListGridContainer.children].forEach(child => {
            let id = parseInt(child.id);
            if(pizzaList.find(elem => elem.id == id).content.meat
            || pizzaList.find(elem => elem.id == id).content.ocean) {
                child.classList.add("hidden");
            }
        });
        chosenCategory.textContent = "Веганські піци";
        updateAvailableFoodAmount();
    }
});

function removeHiddenClass() {
    [...pizzaListGridContainer.children].forEach(child => {
        child.classList.remove("hidden");
    });
}

function updateAvailableFoodAmount() {
    let amount = 0;
    [...pizzaListGridContainer.children].forEach(child => {
        if (!child.classList.contains("hidden")) {
            amount++;
        }
    });
    availableFoodAmount.textContent = amount;
}

function updateOrderAmount() {
    let amount = 0;
    for (let item of cart) {
        amount += item.quantity;
    }
    orderAmount.textContent = amount;
}

function updateOrderPrice() {
    let price = 0;
    for (let item of cart) {
        price += item.quantity * (item.isSmall ? item.pizza.small_size.price : item.pizza.big_size.price);
    }
    orderPrice.textContent = price;
}

clearOrderButton.addEventListener('click', function () {
    cart = [];
    localStorage.clear();
    updateOrderAmount();
    updateOrderPrice();
    asideSection.innerHTML = "";
});