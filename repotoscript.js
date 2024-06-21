let cart = [];

// reading items from local storage

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    console.log(`${key}: ${localStorage.getItem(key)}`);
    cart = JSON.parse(localStorage.user);
}

const jsonData = [
    {
        "Назва піци": {
            type: "level",
        },
        "Розмір": {
            type: "level",
        },
        "Діаметр": {
            type: "number",
        },
        "Вага": {
            type: "number",
        },
        "Ціна": {
            type: "number",
        },
        "Кількість": {
            type: "number",
        },
        "Вартість": {
            type: "number",
        },
    },
];

for (let item of cart) {
    jsonData.push({
        "Назва піци": item.pizza.title,
        "Розмір": item.isSmall ? "Мала" : "Велика",
        "Діаметр": item.isSmall ? item.pizza.small_size.size : item.pizza.big_size.size,
        "Вага": item.isSmall ? item.pizza.small_size.weight : item.pizza.big_size.weight,
        "Ціна": item.isSmall ? item.pizza.small_size.price : item.pizza.big_size.price,
        "Кількість": item.quantity,
        "Вартість": (item.isSmall ? item.pizza.small_size.price : item.pizza.big_size.price) * item.quantity
    });
}



const pivot = new WebDataRocks({
    container: "#wdr-component",
    toolbar: true,
    global: {
        options: {
            grid: {
                showTotals: "off",
                type: "classic",
            },
        },
    },
    report: {
        dataSource: {
            data: jsonData
        },
        slice: {
            rows: [
                { uniqueName: "Назва піци" },
                { uniqueName: "Розмір" },
            ],
            measures: [
                { uniqueName: "Діаметр",
                    grandTotalCaption: "Діаметр",
                 },
                { uniqueName: "Вага",
                    grandTotalCaption: "Вага",
                 },
                { uniqueName: "Ціна",
                    grandTotalCaption: "Ціна",
                 },
                { uniqueName: "Кількість",
                    grandTotalCaption: "Кількість",
                 },
                { uniqueName: "Вартість",
                    grandTotalCaption: "Вартість",
                 },
            ],
            expands: {
                expandAll: true
            }
        }
    }
});