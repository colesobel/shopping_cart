angular.module('shoppingCart.controllers', [])

.controller('homeController', ['$http', 'getProducts', 'shoppingCart', '$state', '$scope', function ($http, getProducts, shoppingCart, $state, $scope) {
  var home = this;
  home.itemsInBag = Object.keys(shoppingCart.items).length
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
    home.itemsInBag = Object.keys(shoppingCart.items).length
    console.log(home.itemsInBag);
    // $state.reload()
  }

  home.search = function (item) {
    if (!home.categoryFilter) {
      return true
    } else {
      if (item.categories.includes(home.categoryFilter)) {
        return true
      }
    }
    return false
  }

  home.nameSearchFun = function (item) {
    if (!home.nameSearch) {
      return true
    } else {
      if (item.name.toLowerCase().includes(home.nameSearch.toLowerCase())) {
        return true
      }
    }
    return false
  }

  home.boolToStr = function (arg) {
    return arg ? 'Highest' : 'Lowest';
  }


}])


.controller('checkoutController', ['$http', 'shoppingCart', '$state', function ($http, shoppingCart, $state) {
  var checkout = this
  checkout.items = []

  for (item in shoppingCart.items) {
    checkout.items.push(shoppingCart.items[item])
  }

  checkout.finalItems = checkout.items.map((item) => {
    item.editCheckout = false
    if (item.quantity) {
      item.quantity = Number(item.quantity)
      return item
    } else {
      item.quantity = 1
      return item
    }
  })

  calculateTotal()
  function calculateTotal() {
    checkout.totalPrice = checkout.finalItems.reduce((total, item) => {
      total += item.price * item.quantity
      return total
    }, 0)
  }

  checkout.deleteItem = function (item) {
    var index = checkout.finalItems.indexOf(item)
    checkout.finalItems.splice(index, 1)
    $state.transitionTo($state.current, { reload: true, inherit: false, notify: true });
    calculateTotal()
    updateServiceShoppingCart()
  }

  checkout.editCheckoutItems = function(index) {
    checkout.finalItems[index].editCheckout = true
    $state.transitionTo($state.current, { reload: true, inherit: false, notify: true });
  }

  function updateServiceShoppingCart() {
    shoppingCart.items = {}
    checkout.finalItems.forEach((item) => {
      shoppingCart.items[item._id] = item
    })
  }

  checkout.saveItemChanges = function (index) {
    checkout.finalItems[index].editCheckout = false
    calculateTotal()
    updateServiceShoppingCart()
  }
}])
