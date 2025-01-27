import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor() { }


  addProductToPanier(product: any) {
    let panier = JSON.parse(localStorage.getItem('panier') || '[]');
    panier.push(product);
    localStorage.setItem('panier', JSON.stringify(panier));
  }

    getPanier() {
        return JSON.parse(localStorage.getItem('panier') || '[]');
    }

    removeProductFromPanier(product: any) {
        let panier = JSON.parse(localStorage.getItem('panier') || '[]');
        panier = panier.filter((p: any) => p.id !== product.id);
        localStorage.setItem('panier', JSON.stringify(panier));
    }

}
