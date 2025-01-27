import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {SortByDatePipe} from "../../pipe/sort-by-date-pipe.pipe";
import {SortByNamePipe} from "../../pipe/sort-by-name.pipe";
import {ProductService} from "../../service/product.service";
import {FormsModule} from "@angular/forms";
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";

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
    SearchBarComponent
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
          @if (filteredProducts.length === 0) {
            <p class="text-gray-500">Aucun résultat trouvé.</p>
          } @else if (filter.type === 'date') {
            @for (p of (filteredProducts | SortByDatePipe:filter.asc); track p.id) {
              <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
            }
          } @else if (filter.type === 'name') {
            @for (p of (filteredProducts | SortByNamePipe:filter.asc); track p.id) {
              <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
            }
          } @else {
            @for (p of filteredProducts; track p.id) {
              <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
            }
          }
        </div>
      </main>

  `,
  styles: ``
})
export class ProductListComponent {
  @Output() searchEvent = new EventEmitter<string>();

  filter: { type: string; asc: boolean } = { type: '', asc: true };
  countFav = 0;
  SearchContent = '';
  productService = inject(ProductService);
  products = this.productService.getProducts();
  filteredProducts = [...this.products];

  addItem(event: number) {
    this.countFav += event;
  }

  onSearch(searchTerm: string) {
    this.searchEvent.emit(searchTerm);
      this.SearchContent = searchTerm;
      this.filteredProducts = this.products.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
}
