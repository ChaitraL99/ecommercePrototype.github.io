window.addEventListener("load", (event) => {
  displayProd(0);
});

function displayProd(category) {
  let temp = "";
  for (i in prodList.products) {
    if (parseInt(prodList.products[i]["Category ID"]) === category) {
      temp +=
        '<li class="cards_item"><div class="card"><div class="card_image"><img src="https://picsum.photos/500/300/?image=10" /></div><h2 class="card_title">' +
        prodList.products[i].Name +
        '<p><br></p></h2><div class="card_content"><button class="btn card_btn" onclick="addToCart(' +
        prodList.products[i]["Product ID"] +
        ')" id="' +
        prodList.products[i]["Product ID"] +
        '" >Add to Cart</button></div></div></li>';
      $("#categoryName").text(`Products under category ${category}`);
    } else if (category === 0) {
      temp +=
        '<li class="cards_item"><div class="card"><div class="card_image"><img src="https://picsum.photos/500/300/?image=10" /></div><h2 class="card_title">' +
        prodList.products[i].Name +
        '<p><br></p></h2><div class="card_content"><button class="btn card_btn" onclick="addToCart(' +
        prodList.products[i]["Product ID"] +
        ')" id="' +
        prodList.products[i]["Product ID"] +
        '" >Add to Cart</button></div></div></li>';
      $("#categoryName").text("All products");
    }
  }
  document.getElementById("prodDisp").innerHTML = temp;
}

var cart = [];
$(function () {
  if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
    showCart();
  }
});

function addToCart(productId) {
  for (i in prodList.products) {
    if (prodList.products[i]["Product ID"] === productId) {
      var prodPrice = prodList.products[i].Price;
      var prodName = prodList.products[i].Name;
      var qty = 1;
    }
  }

  // creating item to push in cart
  var item = { Product: prodName, Price: prodPrice, Qty: qty };
  cart.push(item);
  saveCart();
  showCart();
}

function deleteItem(index) {
  cart.splice(index, 1); // delete item at index
  showCart();
  saveCart();
}

function saveCart() {
  if (window.localStorage) {
    localStorage.cart = JSON.stringify(cart);
  }
}

function showCart() {
  if (cart.length == 0) {
    $("#mycart").css("display", "none");
    return;
  }
  $("#mycart").css("display", "block");
  $("#ulItems").empty();
  for (var i in cart) {
    var item = cart[i];
    var cartItem =
      '<li class="clearfix"><img src="https://picsum.photos/500/300/?image=10" alt="item1" width="70px" height="70px"/><span class="item-name">' +
      item.Product +
      '</span><span class="item-price">' +
      item.Price +
      '</span><span class="item-quantity"><button onclick="deleteItem(' +
      i +
      ')">Delete</button></span></li>';

    $("#ulItems").append(cartItem);
    $("#cartNo").text(cart.length);
  }
}
