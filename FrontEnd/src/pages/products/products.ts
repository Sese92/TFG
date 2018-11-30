import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  public products;
  public filterList;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products = [
      {
        title: 'BICICLETA DE MONTAÑA BTWIN ROCKRIDER 520 AMARILLA 27,5" ROCKRIDER',
        description: 'Concebido para evadirse en las travesías deportivas en BTT. Dalo todo y explora nuevos terrenos de juego. Posición erguida, potencia extensible hasta 3 cm, sillín ergonómico: comodidad al servicio de la eficacia. Ruedas 27.5, frenos de disco dobles, 24 vel.:¡Lo tiene todo!',
        images: [
          'https://www.decathlon.es/media/836/8360662/big_35a2777897594375a1eb8324a42d1410.jpg',
          'https://www.decathlon.es/media/836/8360662/big_ad5bfd8d47d44bccab339937b8799e62.jpg',
          'https://www.decathlon.es/media/836/8360662/big_91595a107e46456988212b4bed63bd97.jpg',
          'https://www.decathlon.es/media/836/8360662/big_45e45e43025342d9896ed6691f4a41d1.jpg'
        ],
        price: "50 €",
        owner: "Dmytro Zilnyk",
        ownerImage: "assets/imgs/user.png"
      },
      {
        title: 'BOTAS DE FÚTBOL PHANTOM X 3 ACADEMY HG TURF ADULTOS ROJO GRIS NIKE',
        description: 'Concebido para futbolistas de nivel perfeccionamiento que juegan en terreno duro o sintético y que buscan comodidad y amortiguación.',
        images: [
          'https://www.decathlon.es/media/851/8516104/big_5a5be4e5-192a-4609-8327-dbe5012fa141.jpg',
          'https://www.decathlon.es/media/851/8516104/big_bbcfc50f-71bf-414b-a0d2-577e065cb821.jpg',
          'https://www.decathlon.es/media/851/8516104/big_d7ed3433-3882-4beb-959c-4efcf7544c9d.jpg'
        ],
        price: "43 €",
        owner: "Dmytro Zilnyk",
        ownerImage: "assets/imgs/user.png"
      },
      {
        title: 'MOCHILA TREKKING FORCLAZ 50 LITROS GRIS QUECHUA',
        description: 'Mochila sencilla y ligera, práctica con sus bolsillos y sus accesos cómodos, ideal para las salidas ocasionales de senderismo y los viajes.',
        images: [
          'https://www.decathlon.es/media/830/8300838/big_80a1b3b91dcc4d00ba520b9e445b40ad.jpg',
          'https://www.decathlon.es/media/830/8300838/big_3798cb0f186b4dcbb71529f4c77f3caa.jpg',
          'https://www.decathlon.es/media/830/8300838/big_2f98778c603f4f34b1f266f8a2b36a67.jpg'
        ],
        price: "30 €",
        owner: "Dmytro Zilnyk",
        ownerImage: "assets/imgs/user.png"
      },
      {
        title: 'BAÑADOR DE NATACIÓN HOMBRE JAMMER 900 FIRST H MESH NARANJA NABAIJI',
        description: 'Bañador de natación para hombre, forma jammer, de poliéster, un material ultra resistente al cloro.Ideal para una práctica intensiva de la natación en piscina o en exterior',
        images: [
          'https://www.decathlon.es/media/848/8484342/big_0de984b8-7bde-4e43-96fb-cd188d2b1112.jpg',
          'https://www.decathlon.es/media/848/8484342/big_4129682b-3b64-43ff-b21a-ad8949d0cc50.jpg',
          'https://www.decathlon.es/media/848/8484342/big_eebc4ec6-43c0-4f54-b5d8-f09940508915.jpg'
        ],
        price: "35 €",
        owner: "Dmytro Zilnyk",
        ownerImage: "assets/imgs/user.png"
      }
      ,
      {
        title: 'HÍBRIDO M4 HOMBRE DIESTRO REGULAR TAYLORMADE',
        description: 'Concebido para realizar largas distancias fácilmente en todo el recorrido.',
        images: [
          'https://www.decathlon.es/media/851/8514598/big_973f62cc-8b65-444a-b8b2-9fdae6ddd22c.jpg',
          'https://www.decathlon.es/media/851/8514598/big_1bfc27ab-77d6-4520-8399-c6b73215fa47.jpg',
          'https://www.decathlon.es/media/851/8514598/big_b8f91548-abf1-4b49-940d-3a9b7ebbac85.jpg'
        ],
        price: "150 €",
        owner: "Dmytro Zilnyk",
        ownerImage: "assets/imgs/user.png"
      }
      
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.initializeItems();
  }

  initializeItems(): void {
    this.filterList = this.products;
  }

  onInput(searchbar) {
    this.initializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }

    this.filterList = this.filterList.filter((v) => {
      if (v.title && q) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  cardDetails(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

}
