document.addEventListener("DOMContentLoaded", function(event) {});

const getCurrentProduct = async function(currentProductId){
    let response = await fetch("http://localhost:3000/api/products/");
    if (response.ok) {
        var data = await response.json();
        var currentProduct = data.find(product => product._id === currentProductId);
    } else {
        console.error("Mais t'y es fou! Change moi l'url de la requête!")
    }
    return currentProduct;
}

const getPageId = async function() {
    let url = new URL(window.location.href);
    let search_params = new URLSearchParams(url.search);
    let currentPageId;
    if(search_params.has('id')) {
        currentPageId = search_params.get('id');
    }
    return currentPageId;
}

function displayProduct(currentProduct) {
    const pageTitle = document.querySelector("title");
    pageTitle.innerHTML = currentProduct.name;

    const productDetailsImg = document.querySelector("div.item__img");
    const productImg = document.createElement("img");    
    productImg.setAttribute("src", currentProduct.imageUrl);
    productImg.setAttribute("alt", currentProduct.altTxt);
    productDetailsImg.appendChild(productImg);

    const productName = document.getElementById("title");
    productName.innerHTML = currentProduct.name;
    
    const productPrice = document.getElementById("price");
    productPrice.innerHTML = currentProduct.price;
    
    const productDesc = document.getElementById("description");
    productDesc.innerHTML = currentProduct.description;

    const productSelectColor = document.getElementById("colors");
    const productColor = [];
    for (i = 0; i < currentProduct.colors.length; i++) {
        productColor[i] = document.createElement("option");
        productColor[i].setAttribute("value", currentProduct.colors[i]);
        productColor[i].innerHTML = currentProduct.colors[i];

        productSelectColor.appendChild(productColor[i]);
    }

}

async function main() {
    let currentProductId = await getPageId();

    let currentProduct = await getCurrentProduct(currentProductId);
    
    displayProduct(currentProduct);

    let addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", function(){ ajouter(currentProduct)});
}

main();


function ajouter(currentProduct) {
    let inCartProduct = [];
    for (var i = 0; i < localStorage.length; i++) {
        inCartProduct[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }

    console.log("----------------");
    console.log("inCartProduct :");
    console.log(inCartProduct);

    let selectProdColor = document.getElementById("colors").value;
    let selectProdQty = document.getElementById("quantity").value;
    selectProdQty = parseInt(selectProdQty);

    let productToAdd = {
        'id' : currentProduct._id, 
        'name' : currentProduct.name,
        'color' : selectProdColor,
        "imageUrl": currentProduct.imageUrl,
        "altTxt": currentProduct.altTxt,
        "description": currentProduct.description,
        'price' : currentProduct.price,
        'qty' : 0
    };
    
    if(!selectProdColor || (1 > selectProdQty || selectProdQty > 100)) {
        console.log("choisis une couleur et mets au moins 1 canap' andouille (mais pas plus de 100 non plus!)");
    }else{
        if (inCartProduct !== undefined) {
            if (inCartProduct.length) {
                for (var i = 0; i < inCartProduct.length; i++) {
                    console.log("----------------");
                    console.log("Valeur de i: "+i);  
                    if ((inCartProduct[i].id == productToAdd.id) && (inCartProduct[i].color == productToAdd.color)) {
                        console.log("----------------");
                        console.log("Le produit existe dans le panier! ");  
                        console.log("----------------");
                        console.log(inCartProduct[i].color);

                        console.log("----------------");
                        console.log("qty before: ");  
                        console.log(inCartProduct[i].qty);

                        productToAdd.qty = inCartProduct[i].qty + selectProdQty;
    
                        console.log("----------------");
                        console.log("qty updated: ");
                        console.log(productToAdd.qty);
                    }else if ((inCartProduct[i].id == productToAdd.id) && (inCartProduct[i].color != productToAdd.color)) {
                        console.log("----------------");
                        console.log("Le produit existe mais d'une couleur différente! ");  
                        console.log("----------------");
                        if ((inCartProduct[i].qty > 0) && (productToAdd.qty > 0)) {
                            console.log("----------------");
                            console.log("qty updated: ");
                            console.log(productToAdd.qty);
                            console.log(inCartProduct[i].qty);
                            productToAdd.qty = productToAdd.qty;
                        }else{
                            productToAdd.qty = selectProdQty;
                        }

                    }else if ((productToAdd.qty == 0)) {
                        console.log("----------------");
                        console.log("Le produit n'existe pas dans le panier! ");  
                        console.log("----------------");
                        productToAdd.qty = selectProdQty;
                        console.log("----------------");
                        console.log("new product :");
                        console.log(productToAdd.qty);
                    }
                }
            }else if ((productToAdd.qty == 0)) {
                console.log("----------------");
                console.log("Le produit n'existe pas dans le panier! ");  
                console.log("----------------");
                productToAdd.qty = selectProdQty;
                console.log("----------------");
                console.log("new product :");
                console.log(productToAdd.qty);
            }
        }
        
        console.log("----------------");
        console.log("new prod info: ");
        console.log(productToAdd);

        localStorage.setItem(productToAdd.id+"-"+productToAdd.color, JSON.stringify(productToAdd));
        console.log("----------------");
        console.log("cart info: ");
        console.log(inCartProduct);
    }
}

// localStorage.clear();
