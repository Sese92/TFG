import { ApiClientService } from './../../client/index';
import { ViewOfferPage } from './../view-offer/view-offer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShipmentDetailsPage } from './shipment-details/shipment-details';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-shipping',
  templateUrl: 'shipping.html',
})
export class ShippingPage {
  public section = 'made';

  //Ventas
  public myOffers;
  public myOrders;

  //Compras
  public offersDone
  public offersRejected
  public ordersDone


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public api: ApiClientService, public storage: Storage) {
    this.section = 'made';
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    })
    loading.present();

    this.storage.get('blockchainUser').then((user) => {
      let userInformation = user[0]
      this.api.getMyProducts(userInformation.userId).subscribe((result) => {
        let products = result.body;
        if (products != "" && products != undefined) {
          for (let i = 0; i < products.length; i++) {
            this.api.getMyOffers(products[i].productId).subscribe(
              result => {
                this.myOffers = result.body;
                for (let i = 0; i < this.myOffers.length; i++) {
                  let buyer = this.myOffers[i].buyer.split('#');
                  let buyerID = buyer[1]
                  let product = this.myOffers[i].product.split('#');
                  let productID = product[1]
                  this.api.getUserById(buyerID).subscribe(
                    result => {
                      this.myOffers[i]["userName"] = result.body[0].name;
                      this.myOffers[i]["userSurname"] = result.body[0].surname;

                      this.api.getProductById(productID).subscribe(
                        result => {
                          this.myOffers[i]["productName"] = result.body[0].name;
                        }
                      )
                    }
                  )

                }
                this.api.getMyOrders(products[i].productId).subscribe(
                  result => {
                    this.myOrders = result.body;
                    for (let i = 0; i < this.myOrders.length; i++) {
                      let buyer = this.myOrders[i].buyer.split('#');
                      let buyerID = buyer[1]
                      let product = this.myOrders[i].product.split('#');
                      let productID = product[1]
                      this.api.getUserById(buyerID).subscribe(
                        result => {
                          this.myOrders[i]["userName"] = result.body[0].name;
                          this.myOrders[i]["userSurname"] = result.body[0].surname;

                          this.api.getProductById(productID).subscribe(
                            result => {
                              this.myOrders[i]["productName"] = result.body[0].name;
                            }
                          )
                        }
                      )

                    }
                  },
                  error => {
                    console.log(error)
                    loading.dismiss();
                  }
                );
              },
              error => {
                console.log(error)
                loading.dismiss();
              }
            );
          }
        }
        this.api.getOffersDone(userInformation.userId).subscribe((result) => {
          this.offersDone = result.body;
          for (let i = 0; i < this.offersDone.length; i++) {
            let product = this.offersDone[i].product.split('#');
            let productID = product[1]

            this.api.getProductById(productID).subscribe(
              result => {
                this.offersDone[i]["productName"] = result.body[0].name;
                let user = result.body[0].owner.split('#');
                let userID = user[1]
                this.api.getUserById(userID).subscribe(
                  result => {
                    this.offersDone[i]["userName"] = result.body[0].name;
                    this.offersDone[i]["userSurname"] = result.body[0].surname;
                  }
                )
              }
            )

          }
          this.api.getOffersRejected(userInformation.userId).subscribe((result) => {
            this.offersRejected = result.body;
            for (let i = 0; i < this.offersRejected.length; i++) {
              let product = this.offersRejected[i].product.split('#');
              let productID = product[1]

              this.api.getProductById(productID).subscribe(
                result => {
                  this.offersRejected[i]["productName"] = result.body[0].name;
                  let user = result.body[0].owner.split('#');
                  let userID = user[1]
                  this.api.getUserById(userID).subscribe(
                    result => {
                      this.offersRejected[i]["userName"] = result.body[0].name;
                      this.offersRejected[i]["userSurname"] = result.body[0].surname;
                    }
                  )
                }
              )
            }
            this.api.getOrdersDone(userInformation.userId).subscribe((result) => {
              this.ordersDone = result.body;
              for (let i = 0; i < this.ordersDone.length; i++) {
                let buyer = this.ordersDone[i].buyer.split('#');
                let buyerID = buyer[1]
                let product = this.ordersDone[i].product.split('#');
                let productID = product[1]
                this.api.getUserById(buyerID).subscribe(
                  result => {
                    this.ordersDone[i]["userName"] = result.body[0].name;
                    this.ordersDone[i]["userSurname"] = result.body[0].surname;

                    this.api.getProductById(productID).subscribe(
                      result => {
                        this.ordersDone[i]["productName"] = result.body[0].name;
                      }
                    )
                  }
                )
              }
              loading.dismiss();
            },
              error => {
                console.log(error);
                loading.dismiss();
              })
          },
            error => {
              console.log(error);
              loading.dismiss();
            })
        },
          error => {
            console.log(error);
            loading.dismiss();
          })
      },
        error => {
          console.log(error);
          loading.dismiss();
        })
    });

  }

  doRefresh(refresher) {
    this.myOffers = new Array()
    this.myOrders = new Array()
    this.offersDone = new Array()
    this.offersRejected = new Array()
    this.ordersDone = new Array()

    this.storage.get('blockchainUser').then((user) => {
      let userInformation = user[0]
      this.api.getMyProducts(userInformation.userId).subscribe((result) => {
        let products = result.body;
        if (products != "" && products != undefined) {
          for (let i = 0; i < products.length; i++) {
            this.api.getMyOffers(products[i].productId).subscribe(
              result => {
                this.myOffers = result.body;
                for (let i = 0; i < this.myOffers.length; i++) {
                  let buyer = this.myOffers[i].buyer.split('#');
                  let buyerID = buyer[1]
                  let product = this.myOffers[i].product.split('#');
                  let productID = product[1]
                  this.api.getUserById(buyerID).subscribe(
                    result => {
                      this.myOffers[i]["userName"] = result.body[0].name;
                      this.myOffers[i]["userSurname"] = result.body[0].surname;

                      this.api.getProductById(productID).subscribe(
                        result => {
                          this.myOffers[i]["productName"] = result.body[0].name;
                        }
                      )
                    }
                  )

                }
                this.api.getMyOrders(products[i].productId).subscribe(
                  result => {
                    this.myOrders = result.body;
                    for (let i = 0; i < this.myOrders.length; i++) {
                      let buyer = this.myOrders[i].buyer.split('#');
                      let buyerID = buyer[1]
                      let product = this.myOrders[i].product.split('#');
                      let productID = product[1]
                      this.api.getUserById(buyerID).subscribe(
                        result => {
                          this.myOrders[i]["userName"] = result.body[0].name;
                          this.myOrders[i]["userSurname"] = result.body[0].surname;

                          this.api.getProductById(productID).subscribe(
                            result => {
                              this.myOrders[i]["productName"] = result.body[0].name;
                            }
                          )
                        }
                      )
                    }
                  },
                  error => {
                    console.log(error)
                    refresher.complete();
                  }
                );
              },
              error => {
                console.log(error)
                refresher.complete();
              }
            );
          }
        }
        this.api.getOffersDone(userInformation.userId).subscribe((result) => {
          this.offersDone = result.body;
          for (let i = 0; i < this.offersDone.length; i++) {
            let product = this.offersDone[i].product.split('#');
            let productID = product[1]

            this.api.getProductById(productID).subscribe(
              result => {
                this.offersDone[i]["productName"] = result.body[0].name;
                let user = result.body[0].owner.split('#');
                let userID = user[1]
                this.api.getUserById(userID).subscribe(
                  result => {
                    this.offersDone[i]["userName"] = result.body[0].name;
                    this.offersDone[i]["userSurname"] = result.body[0].surname;
                  }
                )
              }
            )

          }
          this.api.getOffersRejected(userInformation.userId).subscribe((result) => {
            this.offersRejected = result.body;
            for (let i = 0; i < this.offersRejected.length; i++) {
              let product = this.offersRejected[i].product.split('#');
              let productID = product[1]

              this.api.getProductById(productID).subscribe(
                result => {
                  this.offersRejected[i]["productName"] = result.body[0].name;
                  let user = result.body[0].owner.split('#');
                  let userID = user[1]
                  this.api.getUserById(userID).subscribe(
                    result => {
                      this.offersRejected[i]["userName"] = result.body[0].name;
                      this.offersRejected[i]["userSurname"] = result.body[0].surname;
                    }
                  )
                }
              )
            }
            this.api.getOrdersDone(userInformation.userId).subscribe((result) => {
              this.ordersDone = result.body;
              for (let i = 0; i < this.ordersDone.length; i++) {
                let buyer = this.ordersDone[i].buyer.split('#');
                let buyerID = buyer[1]
                let product = this.ordersDone[i].product.split('#');
                let productID = product[1]
                this.api.getUserById(buyerID).subscribe(
                  result => {
                    this.ordersDone[i]["userName"] = result.body[0].name;
                    this.ordersDone[i]["userSurname"] = result.body[0].surname;

                    this.api.getProductById(productID).subscribe(
                      result => {
                        this.ordersDone[i]["productName"] = result.body[0].name;
                      }
                    )
                  }
                )
              }
              refresher.complete();
            },
              error => {
                console.log(error);
                refresher.complete();
              })
          },
            error => {
              console.log(error);
              refresher.complete();
            })
        },
          error => {
            console.log(error);
            refresher.complete();
          })
      },
        error => {
          console.log(error);
          refresher.complete();
        })
    });

  }

  details(offer) {
    this.navCtrl.push(ViewOfferPage, { "offer": offer })
  }

  shipment(order) {
    this.navCtrl.push(ShipmentDetailsPage, { "order": order });

  }

}
