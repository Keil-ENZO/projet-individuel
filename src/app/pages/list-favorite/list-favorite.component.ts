// src/app/pages/list-favorite/list-favorite.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../service/favorite.service';
import { Product } from '../../product';
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-favorite',
  template: `
    <main class="p-3 mt-20">
      <div class="flex flex-wrap justify-center">
        <app-product-card *ngFor="let product of favoriteProducts" [product]="product"></app-product-card>
      </div>
    </main>
  `,
  imports: [
    ProductCardComponent,
    NgForOf
  ],
  styles: []
})
export class ListFavoriteComponent implements OnInit {
  favoriteProducts: Product[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteProducts = this.favoriteService.getFavorites();
  }
}