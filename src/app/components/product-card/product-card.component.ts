// src/app/components/product-card/product-card.component.ts
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../product';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSmImage } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { ProductService } from '../../service/product.service';
import { FavoriteService } from '../../service/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardFooter,
    MatCardSmImage,
    NgIf
  ],
  template: `
    <mat-card appearance="outlined" class="m-3 p-5 flex flex-col justify-between items-center w-[300px] h-[450px]">
      <div class="flex justify-end w-full">
        <button mat-fab (click)="toggleFavorite()">
          <mat-icon>{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </div>

      <mat-card-header class="flex flex-col-reverse justify-center items-center">
        <img mat-card-sm-image [src]="'assets/' + product.imgUrl" class="w-[100px] h-[150px]">
        <mat-card-title>{{ product.name | uppercase }}</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
      </mat-card-content>

      <mat-card-footer class="flex flex-col gap-3">
        <button *ngIf="router.url === '/'" mat-fab extended color="primary" (click)="navigateToProduct(product.id)">
          <mat-icon>visibility</mat-icon>
          Voir le produit
        </button>
      </mat-card-footer>
    </mat-card>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product = { id: 0, name: '', isFavorite: false, createdDate: new Date(), imgUrl: '' };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);
  favoriteService = inject(FavoriteService);
  protected router = inject(Router);

  isFavorite = false;

  ngOnInit() {
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

  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}