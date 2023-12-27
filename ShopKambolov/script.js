document.addEventListener("DOMContentLoaded", function() {
    launchForm();
    loadShoes();
});

let shoes = [
    {firm: 'Nike', footSize: '38', cost: '3990'},
    {firm: 'Nike', footSize: '40', cost: '2900'},
    {firm: 'Nike', footSize: '41', cost: '3500'},
    {firm: 'Adidas', footSize: '39', cost: '3499'},
    {firm: 'Adidas', footSize: '42', cost: '5600'},
    {firm: 'Adidas', footSize: '41', cost: '3300'},
    {firm: 'BoxFresh', footSize: '38', cost: '3800'},
    {firm: 'Nike', footSize: '39', cost: '4900'},
    {firm: 'Nike', footSize: '41', cost: '4990'}
]

function createShoe(shoe){
    let cell = createElement("div");
    cell.className = "cell";
    cell.InnerHTML = `<h3>Производитель: ${shoe.firm}</h3><p><br>Размер обуви: ${shoe.footSize}</p><br>Цена: ${shoe.cost}</p>`;
    return cell;
}

function loadShoes(){
    let table = document.querySelector("shoesGrid");

    shoes.forEach(shoe => {
        let cell = createShoe(shoe);
        table.appendChild(cell);
    })
}

function setForm(){
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

function launchForm(){
    let storedProfile = localStorage.getItem("userParamsForm");
    if (storedProfile) {
        let  profile = JSON.parse(storedProfile);

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
        let userFirm = user.firm || user.firm.toLowerCase();
        let userFootSize = parseInt(user.footSize, 10);
        let userCost = parseInt(user.cost, 10)

        const shoesGrid = document.getElementById("gridForm");
        shoesGrid.innerHTML = "";

        const filteredProducts = shoes.filter(item => {
            return (!user.firm || item.firm === userFirm) &&
                    (!user.footSize || item.footSize === userFootSize) &&
                    (!user.cost || item.cost === userCost);
        });

        filteredProducts.forEach(item => {
            const card = createShoe(item);
            shoesGrid.appendChild(card);
        });
    }
}





