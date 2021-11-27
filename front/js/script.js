document.addEventListener("DOMContentLoaded", function(event) {
    //console.log(event);
    getItems();
});

function getItems(){

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/api/products/");

    xhr.responseType = "json";

    xhr.send();

    xhr.onload = function(){
        if(xhr.status != 200) {
            console.log("Erreur!");
        }else{
            let allItems = new Object();
            allItems = xhr.response;
            displayAllItems(allItems);
        }
    };
}

function displayAllItems(allItems) {
    //console.log(allItems);
    const sectionItem = document.getElementById("items");
    //console.log(sectionItem);

    allItems.forEach(function(value) {
        //console.log(allItems.length);
        const itemCardLink = document.createElement("a");
        itemCardLink.setAttribute("href", `product.html?id=`+value["_id"]);
        
        const itemCardArticle = document.createElement("article");

        const itemCardImg = document.createElement("img");
        itemCardImg.setAttribute("src", value["imageUrl"]);
        itemCardImg.setAttribute("alt", value["altTxt"]);

        const itemCardName = document.createElement("h3");
        itemCardName.textContent = value["name"];

        const itemCardDesc = document.createElement("p");
        itemCardDesc.textContent = value["description"];
        
        sectionItem.appendChild(itemCardLink);
            itemCardLink.appendChild(itemCardArticle);
                itemCardArticle.appendChild(itemCardImg);
                itemCardArticle.appendChild(itemCardName);
                itemCardArticle.appendChild(itemCardDesc);


        // for (let i = 0; i < allItems.length; i++) {
        //     sectionItem.innerHTML = createItemsCard(value["_id"]);
            
        //     const itemCardLink = document.createElement("a");
        //     itemCardLink.setAttribute("href", `/product.html?id=`+value["_id"]);
        //     console.log(sectionItem.appendChild(itemCardLink));
        // }

    });
}