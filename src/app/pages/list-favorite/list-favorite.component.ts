import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../service/favorite.service';
import { Product } from '../../product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-list-favorite',
  template: `
    <main class="p-3 mt-20 flex justify-center items-center">
      <div *ngIf="favoriteProducts.length === 0">
        <h2 class="text-3xl m-5 p-5">Aucun produit ajouté à votre liste de favoris</h2>
      </div>
      <div *ngIf="favoriteProducts.length > 0">
        <h2 class="text-3xl m-5 p-5">Vos favoris:</h2>
        <div class="flex flex-wrap justify-center">
          <app-product-card *ngFor="let product of favoriteProducts" [product]="product"></app-product-card>
        </div>
      </div>
    </main>
  `,
  imports: [CommonModule, ProductCardComponent],
  styles: [],
})
export class ListFavoriteComponent implements OnInit {
  favoriteProducts: Product[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteProducts = this.favoriteService.getFavorites();
  }
}