import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import { SortByDatePipe } from "./pipe/sort-by-date-pipe.pipe";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {SortByNamePipe} from "./pipe/sort-by-name.pipe";
import {MatLabel} from "@angular/material/form-field";
import {ProductService} from "./service/product.service";
import {SearchBarComponent} from "./components/search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCardComponent, SortByDatePipe, MatFormField, MatSelect, MatOption, FormsModule, SortByNamePipe, MatLabel, SearchBarComponent],
  template: `
    <main class="p-3">
      <div class="flex justify-between">
        <h4 class="text-xl">Favorite products: {{ countFav }}</h4>


        <div class="flex">
          <mat-form-field>
            <mat-label>Filters</mat-label>
            <mat-select [(ngModel)]="filter">
              <mat-option [value]="{ type: 'date', asc: true }">Date asc</mat-option>
              <mat-option [value]="{ type: 'date', asc: false }">Date desc</mat-option>
              <mat-option [value]="{ type: 'name', asc: true }">Nom A-Z</mat-option>
              <mat-option [value]="{ type: 'name', asc: false }">Nom Z-A</mat-option>
            </mat-select>
          </mat-form-field>

<!--          <app-search-bar/>-->
        </div>
      </div>
      <div class="flex flex-wrap">
        @if (filter.type === 'date') {
          @for (p of (products | SortByDatePipe:filter.asc); track p.id) {
            <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
          }
        } @else if (filter.type === 'name') {
          @for (p of (products | SortByNamePipe:filter.asc); track p.id) {
            <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
          }
        } @else {
          @for (p of products; track p.id) {
            <app-product-card [product]=p (addItemEvent)="addItem($event)"/>
          }
        }
        <router-outlet/>
      </div>
    </main>
  `,
  styles: [],
})

export class AppComponent {

  filter: { type: string; asc: boolean } = { type: '', asc: true };
  countFav = 0;
  productService = inject(ProductService);
  products = this.productService.getProducts();


    addItem(event: number) {
        this.countFav += event;
    }
}
