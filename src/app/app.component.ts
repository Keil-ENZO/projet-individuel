import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { SortByDatePipe } from "./pipe/sort-by-date-pipe.pipe";
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { SortByNamePipe } from "./pipe/sort-by-name.pipe";
import { MatLabel } from "@angular/material/form-field";
import { ProductService } from "./service/product.service";
import { FooterComponent } from "./layout/Footer";
import { HeaderComponent } from "./layout/Header";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductCardComponent,
    SortByDatePipe,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    SortByNamePipe,
    MatLabel,
    FooterComponent,
    HeaderComponent
  ],
  template: `

      <div class="bg-gray-100 h-screen flex justify-between flex-col">
          <app-header (searchEvent)="onSearch($event)"></app-header>

          <main class="p-3 mt-20">
              <div class="flex justify-between items-center md:mx-32">
                  <h4 class="text-2xl">Recherche: {{ SearchContent }}</h4>

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
                  <router-outlet/>
              </div>
          </main>

          <app-footer></app-footer>
      </div>
  `,
  styles: [],
})
export class AppComponent {
  filter: { type: string; asc: boolean } = { type: '', asc: true };
  countFav = 0;
  SearchContent = '';

  productService = inject(ProductService);
  products = this.productService.getProducts();
  filteredProducts = [...this.products]; // Copie pour filtrer les produits

  addItem(event: number) {
    this.countFav += event;
  }

  onSearch(searchTerm: string) {
    this.SearchContent = searchTerm;
    this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}