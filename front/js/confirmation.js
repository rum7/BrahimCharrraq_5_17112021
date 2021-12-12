document.addEventListener("DOMContentLoaded", function(event) {
    // Fonction principale
    async function main() {
        // On récupère l'url de la page
        const url = new URL(window.location.href);
        // On ajoute le numéro de commande dans l'élément "orderId"
        document.getElementById("orderId").textContent = url.searchParams.get("id");
        // On vide le localStorage
        localStorage.clear();
    }
    
    main();

});