import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { PanierService } from '../../service/panier.service';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Product } from '../../product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-panier',
  imports: [
    CommonModule,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatFabButton,
    MatIcon,
    UpperCasePipe
  ],
  template: `
    <mat-card *ngFor="let product of products" appearance="outlined" class="m-3 p-5 flex flex-col justify-between items-center w-[300px] h-[450px]">
        <div class="flex justify-end w-full">
          <button mat-fab (click)="makeFavorite(product)">
            <mat-icon>{{ product.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
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
          <button mat-fab extended color="primary" (click)="navigateToProduct(product.id)">
            <mat-icon>visibility</mat-icon>
            Voir le produit
          </button>
          
            <button mat-fab extended color="primary" (click)="deleteProduct(product)">
                <mat-icon>delete</mat-icon>
                Supprimer
            </button>
        </mat-card-footer>
    </mat-card>
  `,
  styles: ``
})
export class PanierComponent implements OnInit {

  private panierService: PanierService;
  protected router = inject(Router);
  @Output() addItemEvent = new EventEmitter<number>();

  products: Product[] = [];

  constructor(panierService: PanierService) {
    this.panierService = panierService;
  }

  ngOnInit(): void {
    this.products = this.panierService.getPanier();

    let favProducts = JSON.parse(localStorage.getItem('favProducts') || '[]');
    this.products.forEach(product => {
      product.isFavorite = favProducts.some((p: Product) => p.id === product.id);
    });
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  makeFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    this.addItemEvent.emit(product.isFavorite ? 1 : -1);
    let favProducts = JSON.parse(localStorage.getItem('favProducts') || '[]');
    if (product.isFavorite) {
      favProducts.push(product);
    } else {
      favProducts = favProducts.filter((p: Product) => p.id !== product.id);
    }
    localStorage.setItem('favProducts', JSON.stringify(favProducts));
  }

  deleteProduct(product: Product) {
    this.panierService.removeProductFromPanier(product);
    this.products = this.panierService.getPanier();
  }
}