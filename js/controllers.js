angular.module('shoppingCart.controllers', [])

.controller('homeController', ['$http', 'getProducts', 'shoppingCart', function ($http, getProducts, shoppingCart) {
  var home = this;
  getProducts.allProducts().then(function (data) {
    home.productList = data.data
    home.categories = Object.keys(data.data.reduce((obj, elem) => {
      elem.categories.forEach((cat) => {
        obj[cat] = cat
      })
      return obj
    }, {}))
  })
  home.addToBag = function(product) {
    var id = product._id
    shoppingCart.items[id] = product
  }

}])


.controller('checkoutController', ['$http', 'shoppingCart', function ($http, shoppingCart) {
  var checkout = this
  checkout.items = []
  for (item in shoppingCart.items) {
    checkout.items.push(shoppingCart.items[item])
  }
  checkout.finalItems = checkout.items.map((item) => {
    if (item.quantity) {
      item.quantity = Number(item.quantity)
      return item
    } else {
      item.quantity = 1
      return item
    }
  })
}])
