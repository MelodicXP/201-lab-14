'use strict';

// ***** Functions *****
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.timesShown = 0;
}
function AppState() {
  this.allProducts = [];
}

// ***** Prototypes Methods/Functions *****
AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'))
    } else {
      this.allProducts.push(new Product(productNames[i]))
    }
  }

}

 // TODO: - Done - Retrieve data from local storage
AppState.prototype.useLocalStorage = function (retrievedData) {

  // Convert data from local storage into usable data
  let parsedProducts = JSON.parse(retrievedData);
  console.log('Parsed Data >>>> ', parsedProducts);

  for (let i = 0; i < parsedProducts.length; i++) {
    if (parsedProducts[i].name === 'sweep') {
      // create product for png file from local storage
      this.allProducts.push(new Product(parsedProducts[i].name, 'png'));
    } else {
      // create products for all other files from local storage
      this.allProducts.push(new Product(parsedProducts[i].name));
    }
    // Assign view and votes to re-created objects from local storage
    this.allProducts[this.allProducts.length - 1].timesShown = parsedProducts[i].timesShown;
    this.allProducts[this.allProducts.length - 1].timesClicked = parsedProducts[i].timesClicked;
  }
  console.log ('Re-created objects from local storage >>> ', this.allProducts);
}

AppState.prototype.saveToLocalStorage = function () {
  // TODO: - Done - Save product data to local storage
  let stringifiedProducts = JSON.stringify(this.allProducts);
  localStorage.setItem('myProducts', stringifiedProducts);

}


// TODO: - Done - Update this instance method to retrieve data from local storage instead of creating new Products on each page load
AppState.prototype.loadItems = function () {
  
  // Retrieve stringified data from local storage
  let retrievedProducts = localStorage.getItem('myProducts');
  console.log('Retrieved Products >>> ', retrievedProducts);

  /*If data present in local storage, use local storage data to create and fill allProducts array, else create new objects wtih insantiateProducts method.*/
  if (retrievedProducts) { 
    this.useLocalStorage(retrievedProducts);
  } else { // else if  'retrievedProducts' is 'null' create new products
    this.instantiateProducts();
  }

}
