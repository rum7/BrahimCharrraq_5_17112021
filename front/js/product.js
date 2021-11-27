document.addEventListener("DOMContentLoaded", function(event) {
    //console.log("mon url: "+itemId);
    getItem();
});


function getItem(){

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/api/products/");

    xhr.responseType = "json";

    xhr.send();

    xhr.onload = function(){
        if(xhr.status != 200) {
            console.log("Erreur!");
        }else{
            const url = (window.location).href;
            let itemId = url.substring(url.lastIndexOf('=') + 1);

            let allItems = new Object();
            allItems = xhr.response;
            
            
            itemInfo = allItems.find(item => item._id === itemId);

            displayItem(itemInfo);


        }
    };
}


function displayItem(itemInfo) {
    const pageTitle = document.querySelector("title");
    pageTitle.innerHTML = itemInfo.name;

    const itemDetailsImg = document.querySelector("div.item__img");
    const itemImg = document.createElement("img");    
    itemImg.setAttribute("src", itemInfo.imageUrl);
    itemImg.setAttribute("alt", itemInfo.altTxt);
    itemDetailsImg.appendChild(itemImg);

    const itemName = document.getElementById("title");
    itemName.innerHTML = itemInfo.name;
    
    const itemPrice = document.getElementById("price");
    itemPrice.innerHTML = itemInfo.price;
    
    const itemDesc = document.getElementById("description");
    itemDesc.innerHTML = itemInfo.description;

    const itemSelectColor = document.getElementById("colors");
    const itemColor = [];
    for (i = 0; i < itemInfo.colors.length; i++) {
        //console.log(itemInfo.colors[i]);
        itemColor[i] = document.createElement("option");
        itemColor[i].setAttribute("value", itemInfo.colors[i]);
        itemColor[i].innerHTML = itemInfo.colors[i];

        itemSelectColor.appendChild(itemColor[i]);
    }

}

let addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", addCart);

function addCart() {
    const selectItemsColor = document.getElementById("colors").value;
    const selectItemsQty = document.getElementById("quantity").value;
    if(!selectItemsColor && (1 > selectItemsQty || selectItemsQty > 100)){
        console.log("choisis une couleur et mets au moins 1 canap' andouille (mais pas plus de 100 non plus!)");
    }else{
        console.log("c'est dans la boite!");
        console.log("----------------");
        console.log(itemInfo._id);
        console.log("----------------");
        console.log(selectItemsColor);
        console.log("----------------");
        console.log(selectItemsQty);
    }
}