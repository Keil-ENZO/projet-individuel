import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";

@Component({
  selector: "app-list-favorite",
  template: `
    <main class="p-3 flex justify-center items-center min-h-screen">
      <div *ngIf="favoriteProducts.length === 0">
        <p class="text-xl text-gray-600">
          Aucun produit ajouté à votre liste de favoris
        </p>
      </div>
      <div *ngIf="favoriteProducts.length > 0">
        <h2 class="text-xl text-gray-600">Vos favoris:</h2>
        <div class="flex flex-wrap justify-center">
          <app-product-card
            *ngFor="let product of favoriteProducts"
            [product]="product"
          ></app-product-card>
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
