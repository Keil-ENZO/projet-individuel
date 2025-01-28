// src/app/pages/product-list/product-list.component.ts
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { SortByDatePipe } from "../../pipe/sort-by-date-pipe.pipe";
import { SortByNamePipe } from "../../pipe/sort-by-name.pipe";
import { ProductService } from "../../service/product.service";
import { FormsModule } from "@angular/forms";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FavoriteService } from "../../service/favorite.service";
import { SearchPipe } from '../../pipe/search.pipe';
import {Product} from "../../product";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-list',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ProductCardComponent,
    SortByDatePipe,
    SortByNamePipe,
    FormsModule,
    SearchBarComponent,
    SearchPipe,
    NgIf,
    NgForOf
  ],
  template: `
    <main class="p-3 mt-20">
      <div class="flex justify-between items-center md:mx-32">
        <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>

        <div class="flex">
          <mat-form-field>
            <mat-label>Filtres</mat-label>
            <mat-select [(ngModel)]="filter">
              <mat-option [value]="{ type: 'date', asc: true }">Date asc</mat-option>
              <mat-option [value]="{ type: 'date', asc: false }">Date desc</mat-option>
              <mat-option [value]="{ type: 'name', asc: true }">Nom A-Z</mat-option>
              <mat-option [value]="{ type: 'name', asc: false }">Nom Z-A</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <p *ngIf="filteredProducts.length === 0" class="text-gray-500">Aucun résultat trouvé.</p>
        <ng-container *ngIf="filter.type === 'date'">
          <app-product-card *ngFor="let p of (filteredProducts | search:SearchContent | SortByDatePipe:filter.asc); trackBy: trackById" [product]="p" (addItemEvent)="addItem($event)"></app-product-card>
        </ng-container>
        <ng-container *ngIf="filter.type === 'name'">
          <app-product-card *ngFor="let p of (filteredProducts | search:SearchContent | SortByNamePipe:filter.asc); trackBy: trackById" [product]="p" (addItemEvent)="addItem($event)"></app-product-card>
        </ng-container>
        <ng-container *ngIf="filter.type === ''">
          <app-product-card *ngFor="let p of (filteredProducts | search:SearchContent); trackBy: trackById" [product]="p" (addItemEvent)="addItem($event)"></app-product-card>
        </ng-container>
      </div>
    </main>
  `,
  styles: ``
})
export class ProductListComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();

  filter: { type: string; asc: boolean } = { type: '', asc: true };
  countFav = 0;
  SearchContent = '';
  productService = inject(ProductService);
  products = this.productService.getProducts();
  filteredProducts = [...this.products];
  private favoriteService: FavoriteService;

  addItem(event: number) {
    this.countFav += event;
  }

  onSearch(searchTerm: string) {
    this.searchEvent.emit(searchTerm);
    this.SearchContent = searchTerm;
  }

  constructor(favoriteService: FavoriteService) {
    this.favoriteService = favoriteService;
  }

  ngOnInit(): void {
    const favorites = this.favoriteService.getFavorites();
    this.products.forEach(product => {
      product.isFavorite = favorites.some(fav => fav.id === product.id);
    });
    this.filteredProducts = [...this.products];
  }

  trackById(index: number, item: Product) {
    return item.id;
  }
}