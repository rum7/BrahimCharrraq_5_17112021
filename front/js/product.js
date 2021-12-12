document.addEventListener("DOMContentLoaded", function(event) {
    // Fonction principale
    async function main() {
        // On Récupère l'url
        const url = new URL(window.location.href);
        // L'id du produit correspond à l'id en paramètre de notre url
        let productId = url.searchParams.get("id");

        // On appelle notre fonction qui va nous retourner notre produit de l'API
        let currentProductId = await GetId(productId);

        // Fonction d'affichage du produit
        DisplayProduct(currentProductId);
    
        // Fonction d'écoute du btn "ajouter au panier"
        BtnClick(currentProductId);
    }
    
    main();

    async function GetId(productId) {
        return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function DisplayProduct(currentProductId) {
        // Récupération des parents
        const pageTitle = document.getElementsByTagName("title")[0];
        const productDetailsImg = document.getElementsByClassName("item__img");
        const productName = document.getElementById("title");
        const productPrice = document.getElementById("price");
        const productDesc = document.getElementById("description");
        let SelecteurCouleur = document.getElementById("colors");
        const parentQuantity = document.getElementById("quantity");

        // Création de notre balise image avec ses attributs
        const productImg = document.createElement("img");
        productImg.setAttribute("src", currentProductId.imageUrl);
        productImg.setAttribute("alt", currentProductId.altTxt);
        productDetailsImg[0].appendChild(productImg);

        // On change les différentes valeurs à la volée
        pageTitle.innerHTML = currentProductId.name;
        productName.innerHTML = currentProductId.name;
        productPrice.innerHTML = currentProductId.price;
        productDesc.innerHTML = currentProductId.description;
        parentQuantity.setAttribute("min", 0);

        let options = currentProductId.colors;
        options.forEach(function (element) {
            SelecteurCouleur.appendChild(new Option(element, element));
        });
    }

    // Initialisation de la class pour un nouveau produit
    class ProductClass {
        constructor(id, name, color, qty, imgurl, price, alt) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.qty = qty;
        this.imgurl = imgurl;
        this.price = price;
        this.alt = alt;
        }
    }

    function BtnClick(product) {
        // Initialisation des variables
        let colorChoosen = "";
        let qtyChoosen = "";
        let qty = "";
        let BtnPanier = document.getElementById("addToCart");

        // Sélection de la couleur à l'aide de l'évènement change
        let colorSelection = document.getElementById("colors");
        colorSelection.addEventListener("change", function (e) {
        colorChoosen = e.target.value;
        });

        // Sélection de la quantité à l'aide de l'évènement change
        let qtySelection = document.getElementById("quantity");
        qtySelection.addEventListener("change", function (e) {
        qty = e.target.value;
        });

        // Écoute du click sur le bouton Panier
        BtnPanier.addEventListener("click", function () {
            
            // Initialisation des variables
            let ProductLocalStorage = [];
            let oldQty = 0;

            // Boucle for à la longueur du localStorage avec récuperation des informations de son contenu
            for (let i = 0; i < localStorage.length; i++) {
                ProductLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
                // Si le produit existe déjà dans le localStorage, on récupère sa quantitée
                if (product._id === ProductLocalStorage[i].id && ProductLocalStorage[i].color === colorChoosen) {
                    oldQty = ProductLocalStorage[i].qty;
                }
            }

            // On Calcule notre nouvelle quantité en prenant en compte l'ancienne valeur
            qtyChoosen = parseInt(oldQty) + parseInt(qty);
            
            // On définit le produit choisi en créant une nouvelle instance de ProductClass et on y ajoute nos valeurs
            let productChoosen = new ProductClass(
                product._id,
                product.name,
                colorChoosen,
                qtyChoosen,
                product.imageUrl,
                product.price,
                product.altTxt
            );

            // Si le client a sélectionné une couleur et que la quantité choisie est supérieure à 0 et inférieur à 100
            if (colorChoosen != "" && qtyChoosen >= 1 && qtyChoosen <= 100) {
                // On envoie notre nouveau produit au localStorage
                localStorage.setItem(
                    product.name + " " + colorChoosen,
                    JSON.stringify(productChoosen)
                );
            } else {
                alert("Veuillez renseigner une couleur et une quantité entre 1 et 100.");
            }
        });
    };
});