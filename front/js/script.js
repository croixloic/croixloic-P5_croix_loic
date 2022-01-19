//récupération des articles dans l'API

async function getArticles() {
  const takeArticles = await fetch("http://localhost:3000/api/products");
  return await takeArticles.json();
}

//afficher les article dans le DOM

 function fillArticle(articles) {

      for (let article in articles) {
        //création du lien dans le html
        let productLink = document.createElement("a");
        productLink.href = `product.html?id=${articles[article]._id}`;
        
        //création de l'article
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
        //création de l'image
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = articles[article].imageUrl;
        productImg.alt = articles[article].altTxt;
        //création titre
        let productTitle = document.createElement("h3");
        productArticle.appendChild(productTitle);
        productTitle.classList.add("producTitle");
        productTitle.innerHTML = articles[article].name;

        // Insertion de la description "p"
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = articles[article].description;
        
        document.querySelector(".items").appendChild(productLink);
      }
    }
getArticles().then(response => fillArticle(response));
