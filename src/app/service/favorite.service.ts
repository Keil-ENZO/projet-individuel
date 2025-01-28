// src/app/service/favorite.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    // clé de stockage locale
    private storageKey = 'favorites';

    // ajouter un produit aux favoris
    addFavorite(product: Product) {
        const favorites = this.getFavorites();
        favorites.push(product);
        this.saveFavorites(favorites);
    }

    // retirer un produit des favoris
    removeFavorite(product: Product) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(p => p.id !== product.id);
        this.saveFavorites(favorites);
    }

    // récupérer les produits favoris
    getFavorites(): Product[] {
        const favorites = localStorage.getItem(this.storageKey);
        return favorites ? JSON.parse(favorites) : [];
    }

    // sauvegarder les produits favoris dans le local storage
    private saveFavorites(favorites: Product[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
}