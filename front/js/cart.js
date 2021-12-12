document.addEventListener("DOMContentLoaded", function(event) {
    // Fonction principale
    async function main() {
        // On stocke nos produits dans une variable.
        let localStorageContent = GetlocalStorageProduct();

        // Affichage du panier.
        displayCart(localStorageContent);
    
        // Mettre à jour le prix total et le nombre d'articles.
        updateTotal(localStorageContent);

        // Fonction d'écoute principal
        eventListener();

        // Passer la commande.     
        checkOrder();
    }
    
    main();

    function GetlocalStorageProduct() {
        // Initialisation des variables.
        let GetlocalStorageProduct = [];

        // On récupère l'ensemble des produits stockés dans le localStorage.
        for (var i = 0; i < localStorage.length; i++) {
            GetlocalStorageProduct[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }

        return GetlocalStorageProduct;
    }

    function displayCart(localStorageContent) {
        // Boucle for avec un of pour afficher chaque produit récupérer de notre localstorage.
        for (product of localStorageContent) {
            // On stock notre balise Html.
            const domCreation = document.getElementById("cart__items");
            // On push nos nouvels informations dans notre Html.
            domCreation.insertAdjacentHTML(
                "beforeend",
                `<article class="cart__item" data-id="${product.id}">
                    <div class="cart__item__img">
                        <img src="${product.imgurl}" alt="${product.alt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p>${product.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
            );
        }
    }

    function updateTotal(localStorageContent) {
        // Initialisation de variable
        let nbProduct = 0;
        let prixTotal = 0;

        // On récupère la quantité et le prix de chaque produit pour calculer le total
        for (product of localStorageContent) {
            // On réalise la somme de la quantité de chaque produit
            nbProduct += parseInt(product.qty, 10);
            // On réalise la somme du produit entre la quantité et le prix de chaque article
            prixTotal += parseInt(product.qty * product.price, 10);
        }

        // On cible les noeuds dans lesquels on va afficher nos résultats
        const totalQuantity = document.getElementById("totalQuantity");
        totalQuantity.textContent = nbProduct;
        const totalPrice = document.getElementById("totalPrice");
        totalPrice.textContent = prixTotal;
    }

    function eventListener() {
        // Mettre à jour la quantité d'un produit du panier.
        prodQtyListener();
        // Supprimer un produit du panier.
        deleteProdListener();
    }

    function prodQtyListener() {
        // Initialisation de variable
        let prodQtyInput = 0;
        // On stocke notre <input>
        let prodQty = document.querySelectorAll(".itemQuantity");

        // On boucle sur notre input
        prodQty.forEach(function (input) {
            // On écoute notre input
            input.addEventListener("input", function (inputEvent) {
                // On stocke notre nouvelle quantité
                prodQtyInput = parseInt(inputEvent.target.value, 10);
                // Conditionnel si la quantité choisie est supérieure à 0 et inférieure à 101
                if (prodQtyInput > 0 && prodQtyInput < 101) {
                    // On récupère le nom et la couleur du produit dont la quantité a changé
                    const upProdQtyName = input
                        .closest("div.cart__item__content")
                        .querySelector("div.cart__item__content__description > h2").textContent;
                    const upProdQtyColor = input
                        .closest("div.cart__item__content")
                        .querySelector("div.cart__item__content__description > p").textContent;
                    // On met à jour la quantité du produit dans le localstorage
                    let newProdQty = JSON.parse(localStorage.getItem(upProdQtyName + " " + upProdQtyColor));
                    newProdQty.qty = prodQtyInput;
                    localStorage.setItem(upProdQtyName + " " + upProdQtyColor, JSON.stringify(newProdQty));
                    // On met à jour le prix total ainsi que le nombre d'article
                    let localStorageContent = GetlocalStorageProduct();
                    updateTotal(localStorageContent);
                } else {
                    alert("Veuillez renseigner une quantité entre 1 et 100.");
                }
            });
        });
    }    

    function deleteProdListener() {
        // On stocke notre bouton supprimer
        let rmvProd = document.querySelectorAll(".deleteItem");

        // On boucle sur notre bouton
        rmvProd.forEach(function (btn) {
            // On écoute notre bouton
            btn.addEventListener("click", function(btnEvent) {
                // On récupère le DOM, le nom et la couleur du produit que l'on souhaite supprimer
                const rmvDomContent = btn.closest("article.cart__item");
                const rmvProdNameClk = btn
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > h2").textContent;
                const rmvProdColorClk = btn
                    .closest("div.cart__item__content")
                    .querySelector("div.cart__item__content__description > p").textContent;
                // On supprime le produit du localStorage
                localStorage.removeItem(rmvProdNameClk + " " + rmvProdColorClk);
                rmvDomContent.remove();
                // On met à jour le prix total ainsi que le nombre d'article
                let localStorageContent = GetlocalStorageProduct();
                updateTotal(localStorageContent);
            });
        });
    }

    function checkForm(formContent) {
        // Initialisation des variables
        let regName = /^[a-zA-Z]*(?:-[a-zA-Z]*)?\S+$/;
        let regAdresse = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let regEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
        let check = true;

        // Checking du prénom entré
        if (!formContent.firstName.value.match(regName)) {
            document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide.";
            check = false;
        } else {
            document.getElementById("firstNameErrorMsg").textContent = "";
        }
        // Checking du nom entré
        if (!formContent.lastName.value.match(regName)) {
            document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide.";
            check = false;
        } else {
            document.getElementById("lastNameErrorMsg").textContent = "";
        }
        // Checking de l'adresse entrée
        if (!formContent.address.value.match(regAdresse)) {
            document.getElementById("addressErrorMsg").textContent = "Veuillez entrer une adresse valide.";
            check = false;
        } else {
            document.getElementById("addressErrorMsg").textContent = "";
        }
        // Checking de la ville entrée
        if (!formContent.city.value.match(regName)) {
            document.getElementById("cityErrorMsg").textContent = "Veuillez entrer une ville valide.";
            check = false;
        } else {
            document.getElementById("cityErrorMsg").textContent = "";
        }
        // Checking de l'adresse email entrée
        if (!formContent.email.value.match(regEmail)) {
            document.getElementById("emailErrorMsg").textContent = "Veuillez entrer une adresse email valide.";
            check = false;
        } else {
            document.getElementById("emailErrorMsg").textContent = "";
        }
        return check;
    }

    function checkOrder() {
        // On stocke notre bouton commander
        let btnOrder = document.getElementById("order");

        // Lorsque l'on clique sur le bouton
        btnOrder.addEventListener("click", function (event) {
            // On récupère ce qu'on a entré dans le formulaire
            let formContent = document.querySelector(".cart__order__form");
            // L'action par défaut du bouton commander ne doit pas être exécutée
            event.preventDefault();
            // Si le panier n'est pas vide
            if (localStorage.length !== 0) {
                // On traite la commande après vérification des informations entrées
                if (checkForm(formContent)) {
                    // On stocke les informations du client
                    let formContentCheck = {
                        firstName: formContent.firstName.value,
                        lastName: formContent.lastName.value,
                        address: formContent.address.value,
                        city: formContent.city.value,
                        email: formContent.email.value
                    };
                    // Initialisation de notre array à vide. 
                    let cartContent = [];

                    // Boucle for pour récupérer nos éléments du localstorage.
                    for (let i = 0; i < localStorage.length; i++) {
                        cartContent[i] = JSON.parse(localStorage.getItem(localStorage.key(i))).id;
                    }
                    // On rassemble toutes ces informations dans un nouvel objet
                    const clientOrder = {
                        contact: formContentCheck,
                        products: cartContent
                    };
                    // On prépare notre requête en précisant les options
                    const options = {
                        method: "POST",
                        body: JSON.stringify(clientOrder),
                        headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        },
                    };
                    // On effectue notre requête POST sur l'API en indiquant nos options en paramètre
                    fetch("http://localhost:3000/api/products/order", options)
                        .then((res) => res.json())
                        .then(function(data) {
                            // On effectue une redirection vers la page de confirmation avec l'id de la commande
                            window.location.href = "confirmation.html?id=" + data.orderId;
                        })
                        .catch(function(err) {
                            alert("error");
                        });
                } else {
                    event.preventDefault();
                    alert("Le formulaire est invalide. Merci de vérifer les informations saisies.");
                }
            } else {
                event.preventDefault();
                alert("Le panier est actuellement vide.");
            }
        });
    }
});