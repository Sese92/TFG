/**
* Transaction to make an offer for a product
* @param {org.tfg.model.MakeOffer} MakeOffer The MakeOffer transaction instance.
* @transaction
*/

function MakeOffer(offerInfo) {
    return getAssetRegistry('org.tfg.model.Offer')
        .then(function (assertRegistryOffer) {
            return assertRegistryOffer.getAll()
                .then(function (allOffers) {
                    var offerId = allOffers.length + 1;
                    var offer = getFactory().newResource('org.tfg.model', 'Offer', offerId.toString());

                    offer.product = offerInfo.product
                    offer.buyer = offerInfo.buyer
                    offer.amount = offerInfo.amount
                    offer.status = "DONE"
                    offer.offerDate = offerInfo.offerDate
                    offer.offerType = offerInfo.offerType
                    offer.shippingPrice = offerInfo.shippingPrice

                    return assertRegistryOffer.add(offer)
                }).catch(function (error) {
                    throw new Error(error);
                });
        }).catch(function (error) {
            throw new Error(error);
        });
}

/**
* Transaction to accept an offer
* @param {org.tfg.model.AcceptOffer} AcceptOffer The AcceptOffer transaction instance.
* @transaction
*/

function AcceptOffer(offerInfo) {
    var offer = offerInfo.offer
    if (offer.status == "DONE") {
        offer.status = "ACCEPTED"
        offer.product.status = "SOLD"

        if (offer.offerType == "WITHOUTSHIPPING") {
            return getAssetRegistry('org.tfg.model.Offer')
                .then(function (offerAsset) {
                    return offerAsset.update(offer);
                })
                .then(function (assetOffer) {
                    return getAssetRegistry('org.tfg.model.Product')
                        .then(function (productAsset) {
                            return productAsset.update(offer.product);
                        })
                        .catch(function (error) {
                            throw new Error(error);
                        });
                })
                .catch(function (error) {
                    throw new Error(error);
                });
        } else {
            return getAssetRegistry('org.tfg.model.Offer')
                .then(function (offerAsset) {
                    return offerAsset.update(offer);
                })
                .then(function (assetOffer) {
                    return getAssetRegistry('org.tfg.model.Product')
                        .then(function (productAsset) {
                            return productAsset.update(offer.product);
                        })
                        .then(function (assetProduct) {
                            return getAssetRegistry('org.tfg.model.Order')
                                .then(function (assertRegistryOrder) {
                                    return assertRegistryOrder.getAll()
                                        .then(function (allOrders) {
                                            var orderId = allOrders.length + 1;
                                            var order = getFactory().newResource('org.tfg.model', 'Order', orderId.toString());

                                            order.status = "WAITING"
                                            order.product = offer.product
                                            order.offer = offer
                                            order.seller = offer.product.owner
                                            order.buyer = offer.buyer
                                            order.carrier = offerInfo.carrier;

                                            return assertRegistryOrder.add(order)
                                        })
                                        .catch(function (error) {
                                            throw new Error(error);
                                        });

                                })
                                .catch(function (error) {
                                    throw new Error(error);
                                });
                        })
                        .catch(function (error) {
                            throw new Error(error);
                        });
                })
                .catch(function (error) {
                    throw new Error(error);
                });
        }
    } else {
        throw new Error("This offer is already accepted or rejected");
    }
}

/**
* Transaction to reject an offer
* @param {org.tfg.model.RejectOffer} RejectOffer The RejectOffer transaction instance.
* @transaction
*/

function RejectOffer(offerInfo) {
    var offer = offerInfo.offer;
    if (offer.status = "DONE") {
        offer.status = "REJECTED"
        offer.product.rejectedDate = offerInfo.rejectedDate

        return getAssetRegistry('org.tfg.model.Offer')
            .then(function (offerAsset) {
                return offerAsset.update(offer);
            }).then(function (assetOffer) {
                    return getAssetRegistry('org.tfg.model.Product')
                        .then(function (productAsset) {
                            return productAsset.update(offer.product);
                        }).catch(function (error) {
                                            throw new Error(error);
                                        });

                                })
          	
            .catch(function (error) {
                throw new Error(error);
            });
    }
    else {
        throw new Error("This offer is already accepted or rejected");
    }
}