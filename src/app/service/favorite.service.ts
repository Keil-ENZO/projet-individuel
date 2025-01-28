// src/app/service/favorite.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private storageKey = 'favorites';

    addFavorite(product: Product) {
        const favorites = this.getFavorites();
        favorites.push(product);
        this.saveFavorites(favorites);
    }

    removeFavorite(product: Product) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(p => p.id !== product.id);
        this.saveFavorites(favorites);
    }

    getFavorites(): Product[] {
        const favorites = localStorage.getItem(this.storageKey);
        return favorites ? JSON.parse(favorites) : [];
    }

    private saveFavorites(favorites: Product[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
}