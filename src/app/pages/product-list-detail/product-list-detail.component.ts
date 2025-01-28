import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../product";
import { ProductService } from "../../service/product.service";
import { ActivatedRoute } from "@angular/router";
import { CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { AddPanierComponent } from "../../components/add-panier/add-panier.component";
import { FavoriteService } from "../../service/favorite.service";

@Component({
  selector: 'app-product-list-detail',
  imports: [
    DatePipe,
    MatFabButton,
    MatIcon,
    UpperCasePipe,
    AddPanierComponent,
    CurrencyPipe
  ],
  template: `
    <main class="flex justify-center mb-32">
      <div class="flex flex-col justify-center gap-5">
        <div class="flex justify-end w-full">
          <button mat-fab (click)="toggleFavorite()">
            <mat-icon>{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
          </button>
        </div>
        <img mat-card-sm-image [src]="'assets/' + product.imgUrl" class="w-[200px] h-[300px]">
        <h2 class="text-xl">{{ product.name | uppercase }}</h2>
        <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
        <p>{{ product.prix | currency:'EUR' }}</p>
        <app-add-panier [product]="product"></app-add-panier>
      </div>
    </main>
  `,
  styles: ``
})
export class ProductListDetailComponent implements OnInit {
  @Input({ required: true }) product: Product = {
    prix: 0,
    id: 0, name: '', isFavorite: false, createdDate: new Date(), imgUrl: ''
  };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);
  favoriteService = inject(FavoriteService);

  isFavorite = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(params['id']);
      this.checkFavoriteStatus();
    });
  }

  ngOnInit() {
    this.checkFavoriteStatus();
  }

  checkFavoriteStatus() {
    this.isFavorite = this.favoriteService.getFavorites().some(p => p.id === this.product.id);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.product);
    } else {
      this.favoriteService.addFavorite(this.product);
    }
    this.isFavorite = !this.isFavorite;
    this.addItemEvent.emit(this.isFavorite ? 1 : -1);
  }
}