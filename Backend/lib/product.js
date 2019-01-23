/**
* Transaction to deposit money
* @param {org.tfg.model.UploadProduct} uploadProduct The UploadProduct transaction instance.
* @transaction
*/

function UploadProduct(productInfo) {

    return getAssetRegistry('org.tfg.model.Product')
        .then(function (assertRegistryProduct) {
            return assertRegistryProduct.getAll()
                .then(function (allProducts) {
                    var productId = allProducts.length + 1;
                    var product = getFactory().newResource('org.tfg.model', 'Product', productId.toString());
                    product.owner = productInfo.owner;
              		product.status = "CREATED"
              		product.name = productInfo.name;
              		product.description = productInfo.description;
              		product.amount = productInfo.amount;
                    product.uploadDate = productInfo.uploadDate;
                    product.numberOfImages = productInfo.numberOfImages;

                    return assertRegistryProduct.add(product);
                })
                .catch(function (error) {
                    throw new Error(error);
                });
        })
        .catch(function (error) {
            throw new Error(error);
        });
}

/**
* Transaction to update user information
* @param {org.tfg.model.UpdateProduct} UpdateProduct The UpdateProduct transaction instance.
* @transaction
*/

function UpdateProduct(productUpdated) {
      	var product = productUpdated.product;
  if (product.status == "CREATED"){
         product.name = productUpdated.name;
         product.description = productUpdated.description;
         product.amount = productUpdated.amount;
    
      return getAssetRegistry('org.tfg.model.Product')
    .then(function (productAsset) {
      return productAsset.update(product);
    })
    .catch(function (error) {
      throw new Error(error);
    });
  }
  else{
     throw new Error("This product is already sold");
  }


}