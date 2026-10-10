function $(id) {
  return document.getElementById(id);
}

var products = [
  { id: 1, name: "Fresh Tomatoes (basket)", price: 35, category: "vegetables", image: "https://images.pexels.com/photos/5503504/pexels-photo-5503504.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Akosua Serwaa Frimpong" },
  { id: 2, name: "Carrots (bunch)", price: 12, category: "vegetables", image: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Ibrahim Alhassan Yakubu" },
  { id: 3, name: "Pineapple", price: 15, category: "fruits", image: "https://images.pexels.com/photos/7194792/pexels-photo-7194792.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Nii Armah Tackie" },
  { id: 4, name: "Watermelon", price: 20, category: "fruits", image: "https://images.pexels.com/photos/13551695/pexels-photo-13551695.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Esi Seyram Avle" },
  { id: 5, name: "Ripe Mangoes (basket)", price: 25, category: "fruits", image: "https://images.pexels.com/photos/30741640/pexels-photo-30741640.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Kofi Abrefa Busia" },
  { id: 6, name: "Farm Fresh Eggs (dozen)", price: 30, category: "dairy", image: "https://images.pexels.com/photos/30805254/pexels-photo-30805254.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Naa Atswei Lartey" },
  { id: 7, name: "Fresh Milk (1 litre)", price: 18, category: "dairy", image: "https://images.pexels.com/photos/5946755/pexels-photo-5946755.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Sefa Korku Agbesi" },
  { id: 8, name: "Raw Honey (jar)", price: 45, category: "pantry", image: "https://images.pexels.com/photos/8500508/pexels-photo-8500508.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Emmanuel Kwesi Boateng" },
  { id: 9, name: "Yams (tuber)", price: 10, category: "pantry", image: "https://images.pexels.com/photos/34143558/pexels-photo-34143558.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Suaad Azindoo Tia" },
  { id: 10, name: "Red Onions (bag)", price: 14, category: "vegetables", image: "https://images.pexels.com/photos/38088072/pexels-photo-38088072.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Afia Pokuaa Mensah" },
  { id: 11, name: "Avocados (bag of 4)", price: 16, category: "fruits", image: "https://images.pexels.com/photos/27462724/pexels-photo-27462724.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Kpakpo Oti Quaye" },
  { id: 12, name: "Goat Cheese", price: 38, category: "dairy", image: "https://images.pexels.com/photos/251599/pexels-photo-251599.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Kofi Mawuli Mensah" },
  { id: 13, name: "Groundnuts (bag)", price: 13, category: "pantry", image: "https://images.pexels.com/photos/33501329/pexels-photo-33501329.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Kwadwo Sheldon Asare" }
];

var cart = [];
var wishlist = [];
var currentCategory = "all";
var currentSearch = "";

function renderProducts() {
  var html = "";

  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var matchesCategory = currentCategory === "all" || p.category === currentCategory;
    var matchesSearch = p.name.toLowerCase().indexOf(currentSearch) !== -1;

    if (matchesCategory && matchesSearch) {
      var isFavorite = wishlist.indexOf(p.id) !== -1;

      html += '<article class="card">' +
        '<figure class="card-image-wrap">' +
        '<img class="card-image" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        '<button type="button" class="favorite-btn' + (isFavorite ? ' active' : '') + '" ' +
        'aria-label="Save ' + p.name + '" aria-pressed="' + isFavorite + '" onclick="toggleFavorite(' + p.id + ')">' +
        (isFavorite ? '&#9829;' : '&#9825;') + '</button>' +
        '<figcaption class="card-title">' + p.name + '</figcaption>' +
        '</figure>' +
        '<p class="price"><span class="price-name">' + p.name + '</span> GH₵' + p.price + '</p>' +
        '<p class="seller">by ' + p.seller + '</p>' +
        '<button type="button" class="btn btn-add" onclick="addToCart(' + p.id + ')">Add to cart</button>' +
        '</article>';
    }
  }

  if (html === "") {
    html = "<p>No produce matches your search.</p>";
  }

  $("product-list").innerHTML = html;
}

function filterProducts(category, button) {
  var buttons = document.getElementsByClassName("filter");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = "filter";
  }
  button.className = "filter active";

  currentCategory = category;
  renderProducts();
}

function searchProducts(text) {
  currentSearch = text.toLowerCase();
  renderProducts();
}

function toggleFavorite(id) {
  var position = wishlist.indexOf(id);
  if (position === -1) {
    wishlist.push(id);
  } else {
    wishlist.splice(position, 1);
  }

  renderProducts();
  renderWishlist();
}

function removeFromWishlist(id) {
  var position = wishlist.indexOf(id);
  if (position !== -1) {
    wishlist.splice(position, 1);
  }

  renderProducts();
  renderWishlist();
}

function renderWishlist() {
  if (!$("wishlist-items")) {
    return;
  }

  var html = "";

  if (wishlist.length === 0) {
    html = '<li class="empty">Your wishlist is empty.</li>';
  } else {
    for (var i = 0; i < wishlist.length; i++) {
      var p = findProduct(wishlist[i]);
      if (p === null) {
        continue;
      }

      html += '<li>' +
        '<span><img class="cart-thumb" src="' + p.image + '" alt="">' + p.name + '</span>' +
        '<span class="line-price">GH₵' + p.price +
        ' <button type="button" class="btn btn-add-small" onclick="addToCart(' + p.id + ')">Add to cart</button>' +
        ' <button type="button" class="remove" onclick="removeFromWishlist(' + p.id + ')" ' +
        'aria-label="Remove ' + p.name + ' from wishlist">✕</button>' +
        '</span>' +
        '</li>';
    }
  }

  $("wishlist-items").innerHTML = html;
  $("wishlist-count").innerHTML = wishlist.length;
}

function findProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

function addToCart(id) {
  var product = findProduct(id);
  if (product === null) {
    return;
  }

  var qtyInput = $("qty-" + id);
  var qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
  if (isNaN(qty) || qty < 1) {
    qty = 1;
  }

  var existing = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      existing = cart[i];
      break;
    }
  }

  if (existing !== null) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
      qty: qty
    });
  }

  if (qtyInput) {
    qtyInput.value = "1";
  }

  updateCart();
}

function removeFromCart(position) {
  cart.splice(position, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function getTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

function getItemCount() {
  var count = 0;
  for (var i = 0; i < cart.length; i++) {
    count += cart[i].qty;
  }
  return count;
}

function updateCart() {
  var html = "";

  if (cart.length === 0) {
    html = '<li class="empty">Your cart is empty.</li>';
  } else {
    for (var i = 0; i < cart.length; i++) {
      html += '<li>' +
        '<span><img class="cart-thumb" src="' + cart[i].image + '" alt="">' +
        cart[i].qty + '&times; ' + cart[i].name + '</span>' +
        '<span class="line-price">GH₵' + (cart[i].price * cart[i].qty) +
        ' <button type="button" class="remove" onclick="removeFromCart(' + i + ')" ' +
        'aria-label="Remove ' + cart[i].name + '">✕</button>' +
        '</span>' +
        '</li>';
    }
  }

  $("cart-items").innerHTML = html;
  $("cart-total").innerHTML = "Total: GH₵" + getTotal();
  $("cart-count").innerHTML = getItemCount();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add something first!");
    return;
  }

  window.location.href = "checkout.html";
}

function listItem() {
  var name = $("item-name").value;
  var price = $("price").value;
  var category = $("category").value;
  var seller = $("seller-name").value;

  $("listed-message").innerHTML =
    "Thanks, " + seller + "! Your <strong>" + name + "</strong> is now listed under " +
    category + " for <strong>GH₵" + price + "</strong>.";

  $("listed-dialog").showModal();
  $("sell-form").reset();

  return false;
}

if ($("product-list")) {
  renderProducts();
  renderWishlist();
}
