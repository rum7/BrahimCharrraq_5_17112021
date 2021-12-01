document.addEventListener("DOMContentLoaded", function(event) {});

async function main() {
    
    displayCart();

}

main();

function displayCart() {
    let inCartProduct = [];
    for (var i = 0; i < localStorage.length; i++) {
        inCartProduct[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }

    const sectionCart_Product = document.getElementById("cart__items");
    let prixTotal = 0;
    let qtyTotal = 0;
    inCartProduct.forEach(function(product) {
        const productDetails = document.createElement("article");    
        productDetails.setAttribute("class", "cart__item");
        productDetails.setAttribute("data-id", product.id);
        productDetails.setAttribute("data-color", product.color);


        const productCartImg = document.createElement("div");    
        productCartImg.setAttribute("class", "cart__item__img");
        const productCartImgDetails = document.createElement("img");    
        productCartImgDetails.setAttribute("src", product.imageUrl);
        productCartImgDetails.setAttribute("alt", product.altTxt);


        const productCartContent = document.createElement("div");    
        productCartContent.setAttribute("class", "cart__item__content");

        const productCartContentDesc = document.createElement("div");    
        productCartContentDesc.setAttribute("class", "cart__item__content__description");
        const productCartContentDescName = document.createElement("h2");
        productCartContentDescName.textContent = product.name;
  
        const productCartContentDescColor = document.createElement("p");   
        productCartContentDescColor.textContent = product.color;
 
        const productCartContentDescPrice = document.createElement("p");
        productCartContentDescPrice.textContent = product.price;

        const productCartContentSet = document.createElement("div");    
        productCartContentSet.setAttribute("class", "cart__item__content__settings");
        const productCartContentSetQty = document.createElement("div");    
        productCartContentSetQty.setAttribute("class", "cart__item__content__settings__quantity");        
        
        const productCartContentSetQtyLbl = document.createElement("p");   
        productCartContentSetQtyLbl.textContent = "Qté : ";
 
        const productCartContentSetQtyInput = document.createElement("input");
        productCartContentSetQtyInput.setAttribute("type", "number");
        productCartContentSetQtyInput.setAttribute("class", "itemQuantity");
        productCartContentSetQtyInput.setAttribute("name", "itemQuantity");
        productCartContentSetQtyInput.setAttribute("min", "1");
        productCartContentSetQtyInput.setAttribute("min", "1");
        productCartContentSetQtyInput.setAttribute("max", "100");
        productCartContentSetQtyInput.setAttribute("value", product.qty);

        const productCartContentSetDel = document.createElement("div");    
        productCartContentSetDel.setAttribute("class", "cart__item__content__settings__delete"); 
        const productCartContentSetDelProd = document.createElement("p");    
        productCartContentSetDelProd.setAttribute("class", "deleteItem");
        productCartContentSetDelProd.textContent = "Supprimer";


        sectionCart_Product.appendChild(productDetails);
        productDetails.appendChild(productCartImg);
        productCartImg.appendChild(productCartImgDetails);
        productDetails.appendChild(productCartContent);
        
        productCartContent.appendChild(productCartContentDesc);
        productCartContentDesc.appendChild(productCartContentDescName);
        productCartContentDesc.appendChild(productCartContentDescColor);
        productCartContentDesc.appendChild(productCartContentDescPrice);

        productCartContent.appendChild(productCartContentSet);
        productCartContentSet.appendChild(productCartContentSetQty);
        productCartContentSetQty.appendChild(productCartContentSetQtyLbl);
        productCartContentSetQty.appendChild(productCartContentSetQtyInput);

        productCartContentSet.appendChild(productCartContentSetDel);
        productCartContentSetDel.appendChild(productCartContentSetDelProd);

        qtyTotal += product.qty;
        prixTotal += (product.qty * product.price);
    });
    
    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = qtyTotal;
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = prixTotal;

    
    console.log("----------------");
    console.log("qté total :");
    console.log(qtyTotal);
    console.log("----------------");
    console.log("prix total :");
    console.log(prixTotal);
    console.log("----------------");
    console.log("inCartProduct :");
    console.log(inCartProduct);
    
}