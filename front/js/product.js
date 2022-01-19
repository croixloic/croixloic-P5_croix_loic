let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
let article = "";

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

function getArticle() {
  //récupération des articles de l'API
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => {
      return response.json();
    })
    .then(async function (response) {
      article = await response;
      console.log(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getArticle();

function getPost(article) {
  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  //titre
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  //prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  //description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  //choix des couleurs
  for (let colors of article.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//gestion du Panier

function addToCart(article) {
  const btn_submitPanier = document.querySelector("#addToCart");
  btn_submitPanier.addEventListener("click", (Event) => {
    if (quantityChoice.value > 0 && quantityChoice.value < 101) {
      let choixCouleur = colorChoice.value;
      let choixQuantite = quantityChoice.value;

      //récupération des article au panier
      let optionProduit = {
        idProduct: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };
      // initialisationdu local storage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
      // popup confirmation
      const popupConfirmation = () => {
        if (
          window.confirm(
            `Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier. Pour consulter votre panier, cliquez su OK`
          )
        ) {
          window.location.href = "cart.html";
        }
      };
      // Importation dans le storage
      if (produitLocalStorage) {
        const resultFinal = produitLocalStorage.find(
          (elem) =>
            elem.idProduit === idProduct && elem.couleurProduit === choixCouleur
        );
        if (resultFinal) {
          let newQuantite =
            parseInt(optionProduit.quantiteProduit,10) +
            parseInt(resultFinal.quantiteProduit);
          resultFinal.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          popupConfirmation();
        } else {
          produitLocalStorage.push(optionProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          popupConfirmation();
        }
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
