// initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
const positionEmptyCart = document.querySelector("#cart__items");

// gestion de panier
// si il est vide
function getCart(produitLocalStorage) {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    console.log(produitLocalStorage);
    for (let produit in produitLocalStorage) {
      // insertion des elements
      // article
      let cartArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(cartArticle);
      cartArticle.className = "cart__item";
      cartArticle.setAttribute("data-id", produit.idProduit);

      // la première div (image)
      let cartDivImg = document.createElement("div");
      cartArticle.appendChild(cartDivImg);
      cartDivImg.className = "cart__item__img";

      //image
      let cartImg = document.createElement("img");
      cartDivImg.appendChild(cartImg);
      cartImg.src = produitLocalStorage[produit].imgProduit;
      cartImg.alt = produitLocalStorage[produit].altImgProduit;

      // div du prix
      let cartItemContent = document.createElement("div");
      cartArticle.appendChild(cartItemContent);
      cartItemContent.className = "cart__item__content";

      //div du titre et prix
      let cartItemContentTitlePrice = document.createElement("div");
      cartItemContent.appendChild(cartItemContentTitlePrice);
      cartItemContentTitlePrice.className = "cart__item__content";

      //titre h2
      let cartTitle = document.createElement("h2");
      cartItemContentTitlePrice.appendChild(cartTitle);
      cartTitle.innerHTML = produitLocalStorage[produit].nomProduit;

      //insertion de la couleur
      let cartColor = document.createElement("p");
      cartTitle.appendChild(cartColor);
      cartColor.innerHTML = produitLocalStorage[produit].couleurProduit;
      cartColor.style.fontSize = "20px";

      //insertion du prix
      let cartPrice = document.createElement("p");
      cartItemContentTitlePrice.appendChild(cartPrice);
      cartPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

      //insertion des 2 div
      let cartItemContentSettings = document.createElement("div");
      cartItemContent.appendChild(cartItemContentSettings);
      cartItemContentSettings.className = "cart__item__content__settings";

      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      //insertion de qté
      let cartQte = document.createElement("p");
      cartItemContentSettingsQuantity.appendChild(cartQte);
      cartQte.innerHTML = "Qté : ";

      //insertion de la quantité
      let cartQuantity = document.createElement("input");
      cartItemContentSettingsQuantity.appendChild(cartQuantity);
      cartQuantity.value = produitLocalStorage[produit].quantiteProduit;
      cartQuantity.className = "itemQuantity";
      cartQuantity.setAttribute("type", "number");
      cartQuantity.setAttribute("min", "1");
      cartQuantity.setAttribute("max", "100");
      cartQuantity.setAttribute("name", "itemQuantity");

      // insertion de la div supprimer
      let cartItemContentSettingsDelete = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
      cartItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // insertion du p supprimer
      let cartSupprimer = document.createElement("p");
      cartItemContentSettingsDelete.appendChild(cartSupprimer);
      cartSupprimer.className = "deleteItem";
      cartSupprimer.innerHTML = "Supprimer";
    }
  }
}
getCart(produitLocalStorage);

// fonction pour la quantité total
function getTotals() {
  // Récupération du total des quantités
  const elemsQtt = document.getElementsByClassName("itemQuantity");
  const myLength = elemsQtt.length;
  let totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let cartTotalQuantity = document.getElementById("totalQuantity");
  cartTotalQuantity.innerHTML = totalQtt;

  // Récupération du prix total
  let totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
    totalPrice +=
      elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

// modification de la quantité
function modifiQuantite() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let j = 0; j < qttModif.length; j++) {
    qttModif[j].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = produitLocalStorage[j].quantiteProduit;
      let qttModifValue = qttModif[j].valueAsNumber;

      const resultFinal = produitLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFinal.quantiteProduit = qttModifValue;
      produitLocalStorage[j].quantiteProduit = resultFinal.quantiteProduit;

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

      // refresh rapide
      location.reload();
    });
  }
}
modifiQuantite();

// suppression de produit
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_supprimer.length; k++) {
    btn_supprimer[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = produitLocalStorage[k].idProduit;
      let colorDelete = produitLocalStorage[k].couleurProduit;

      produitLocalStorage = produitLocalStorage.filter(
        (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();
function getForm() {
  let form = document.querySelector(".cart__order__form");

  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,6}$"
  );
  let charRegex = new RegExp("[a-zA-Z,.-]");
  let addressRegex = new RegExp(
    "^[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  form.firstName.addEventListener("change", function () {
    trueFirstName(this);
  });
  form.lastName.addEventListener("change", function () {
    trueLastName(this);
  });
  form.address.addEventListener("change", function () {
    trueAddress(this);
  });
  form.city.addEventListener("change", function () {
    trueCity(this);
  });
  form.email.addEventListener("change", function () {
    trueEmail(this);
  });

  // validation du prènom
  const trueFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (charRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "Valide";
    } else {
      firstNameErrorMsg.innerHTML = "Format non valide.";
    }
  };
  // valdation du nom
  const trueLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "Valide";
    } else {
      lastNameErrorMsg.innerHTML = "Format non valide.";
    }
  };
  const trueAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegex.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "Valide";
    } else {
      addressErrorMsg.innerHTML = "Format non valide.";
    }
  };
  //validation de la ville
  const trueCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegex.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "Valide";
    } else {
      cityErrorMsg.innerHTML = "Format non valide.";
    }
  };
  const trueEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegex.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "Valide";
    } else {
      emailErrorMsg.innerHTML = "Format non valide.";
    }
  };
}
getForm();
// Envoie des informations clien au localstorage
function postForm() {
  const btn_commander = document.getElementById("order");

  btn_commander.addEventListener("click", (event) => {
    event.preventDefault();
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAddress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    // construction du tableau dans le localstorage
    let idProducts = [36];

    // for (let i = 0; i < produitLocalStorage.length; i++) {
      // idProducts.push(produitLocalStorage[i].idProduit);
    // }
    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    }
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        // localStorage.clear();
        // localStorage.setItem("orderId", data.orderId);
        // document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  })
}
postForm();

