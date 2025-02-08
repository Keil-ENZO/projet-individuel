import { Injectable } from "@angular/core";
import { Product } from "../product";

@Injectable({
  providedIn: "root",
})
export class PanierService {
  constructor() {}
  addProductToPanier(product: Product, quantite: number) {
    let panier = JSON.parse(localStorage.getItem("panier") || "[]");

    let existingProduct = panier.find((p: Product) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantite = (existingProduct.quantite ?? 0) + quantite;
    } else {
      product = { ...product, quantite: quantite > 0 ? quantite : 1 };
      panier.push(product);
    }

    localStorage.setItem("panier", JSON.stringify(panier));
  }

  getPanier() {
    return JSON.parse(localStorage.getItem("panier") || "[]");
  }

  removeProductFromPanier(product: any) {
    let panier = JSON.parse(localStorage.getItem("panier") || "[]");

    panier = panier.filter((p: any) => p.id !== product.id);

    localStorage.setItem("panier", JSON.stringify(panier));
  }

  updateProductQuantity(productId: number, newQuantity: number) {
    let panier = JSON.parse(localStorage.getItem("panier") || "[]");

    let product = panier.find((p: any) => p.id === productId);
    if (product) {
      product.quantite = newQuantity;
    }

    localStorage.setItem("panier", JSON.stringify(panier));
  }

  clearPanier() {
    localStorage.removeItem("panier");
    localStorage.setItem("panier", "[]");
  }
}
