/**
* Transaction to pickup an order
* @param {org.tfg.model.PickUpProduct} PickUpProduct The PickUpProduct transaction instance.
* @transaction
*/

function PickUpProduct(orderInfo) {
    var order = orderInfo.order;

    if (order.status = "WAITING") {
        order.status = "ONTHEWAY"
        order.product.receivedDate = orderInfo.receivedDate

        return getAssetRegistry('org.tfg.model.Order')
            .then(function (orderAsset) {
                return orderAsset.update(order);
            }).then(function (orderAsset) {
                return getAssetRegistry('org.tfg.model.Product')
                    .then(function (productAsset) {
                        return productAsset.update(order.product);
                    })
                    .catch(function (error) {
                        throw new Error(error);
                    });
            })
            .catch(function (error) {
                throw new Error(error);
            });
    }
    else {
        throw new Error("This order is already picked up");
    }
}

/**
* Transaction to deliver and complete a Order
* @param {org.tfg.model.DeliverProduct} DeliverProduct The DeliverProduct transaction instance.
* @transaction
*/

function DeliverProduct(orderInfo) {
    var order = orderInfo.order;

    if (order.status = "ONTHEWAY") {
        order.status = "RECEIVED"
        order.product.finishedDate = orderInfo.finishedDate
        order.product.owner = order.buyer

        return getAssetRegistry('org.tfg.model.Order')
            .then(function (orderAsset) {
                return orderAsset.update(order);
            }).then(function (orderAsset) {
                return getAssetRegistry('org.tfg.model.Product')
                    .then(function (productAsset) {
                        return productAsset.update(order.product);
                    })
                    .catch(function (error) {
                        throw new Error(error);
                    });
            })
            .catch(function (error) {
                throw new Error(error);
            });
    }
    else {
        throw new Error("This order is already delivered");
    }
}