document.addEventListener("DOMContentLoaded", function () {
    launchForm();
    loadShoes();
});

let shoes = [
    { firm: 'Nike', footSize: '38', cost: '3990' },
    { firm: 'Nike', footSize: '40', cost: '2900' },
    { firm: 'Nike', footSize: '41', cost: '3500' },
    { firm: 'Adidas', footSize: '39', cost: '3499' },
    { firm: 'Adidas', footSize: '42', cost: '5600' },
    { firm: 'Adidas', footSize: '41', cost: '3300' },
    { firm: 'BoxFresh', footSize: '38', cost: '3800' },
    { firm: 'Nike', footSize: '39', cost: '4900' },
    { firm: 'Nike', footSize: '41', cost: '4990' }
];

function createShoe(shoe) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.innerHTML = `<h3>Фирма:<br> ${shoe.firm}</h3><p><br>Размер обуви: ${shoe.footSize}</p><br>Цена: ${shoe.cost}</p>`;
    return cell;
}

function loadShoes() {
    let table = document.getElementById("gridForm");

    shoes.forEach(shoe => {
        let cell = createShoe(shoe);
        table.appendChild(cell);
    });
}

function setForm() {
    let userForm = document.getElementById("userParamsForm");
    let data = new FormData(userForm);

    let profile = {};
    data.forEach((value, key) => {
        if (value.trim() !== "") {
            profile[key] = value.trim();
        }
    });
    localStorage.setItem("userParamsForm", JSON.stringify(profile));
}

function launchForm() {
    let storedProfile = localStorage.getItem("userParamsForm");
    if (storedProfile) {
        let profile = JSON.parse(storedProfile);

        for (const key in profile) {
            if (Object.hasOwnProperty.call(profile, key)) {
                document.getElementById(key).value = profile[key];
            }
        }
    }
}

function filterProducts() {
    const storedProfile = localStorage.getItem("userParamsForm");
    if (storedProfile) {
        let user = JSON.parse(storedProfile);
        let userFirm = user.firm ? user.firm.toLowerCase() : "";
        let userFootSize = parseFloat(user.footSize) || 0;
        let userCost = parseFloat(user.cost) || 0;

        const shoesGrid = document.getElementById("gridForm");
        shoesGrid.innerHTML = "";

        const filteredProducts = shoes.filter(item => {
            const itemFirm = item.firm.toLowerCase();
            const itemFootSize = parseFloat(item.footSize);
            const itemCost = parseFloat(item.cost);

            return (!user.firm || itemFirm === userFirm) &&
                (!user.footSize || itemFootSize === userFootSize) &&
                (!user.cost || itemCost === userCost);
        });

        filteredProducts.forEach(item => {
            const card = createShoe(item);
            shoesGrid.appendChild(card);
        });
    }
}

