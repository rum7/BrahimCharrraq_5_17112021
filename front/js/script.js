document.addEventListener("DOMContentLoaded", function(event) {
    // Fonction principale
    async function main() {
        let products = await GetProducts();
        for (let article of products) {
            displayProducts(article);
        };
    };

    main();

    // Fonction de récupération des produits dans l'API
    async function GetProducts() {
        return fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    // Fonction d'affichage des produits
    function displayProducts(products) {        
        // Récupération du parent
        const domContent = document.getElementById("items");
        // On insert dans le html
        domContent.insertAdjacentHTML(
            "beforeend",
            `<a href="./product.html?id=${products._id}">
                <article>
                    <img src="${products.imageUrl}" alt="${products.altTxt}">
                    <h3 class="productName">${products.name}</h3>
                    <p class="productDescription">${products.description}</p>
                </article>
            </a>`
        );
    };
});