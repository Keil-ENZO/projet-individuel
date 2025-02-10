import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SearchPipe } from '../../pipe/search.pipe';
import { SortByNamePipe } from '../../pipe/sort-by-name.pipe';
import { SortByHpPipe } from '../../pipe/sort-by-hp.pipe';
import { FilterByTypePipe } from '../../pipe/filter-by-type.pipe';
import { Product } from '../../product';
import { FavoriteService } from '../../service/favorite.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOption,
    ProductCardComponent,
    SearchBarComponent,
    SearchPipe,
    SortByNamePipe,
    SortByHpPipe,
    FilterByTypePipe
  ],
  providers: [
    SearchPipe,
    SortByNamePipe,
    SortByHpPipe,
    FilterByTypePipe
  ],
  template: `
    <main class="p-3 mt-20">
      <div class="flex justify-between items-center md:mx-32">
        <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>

        <div class="flex">
          <mat-form-field>
            <mat-label>Filtres</mat-label>
            <mat-select [(ngModel)]="filter.type" (selectionChange)="onFilterChange()">
              <mat-option value="">Tous</mat-option>
              <mat-option value="Fire">Feu</mat-option>
              <mat-option value="Water">Eau</mat-option>
              <mat-option value="Grass">Plante</mat-option>
              <mat-option value="Electric">Electrique</mat-option>
              <mat-option value="Psychic">Psy</mat-option>
              <!-- Ajouter d'autres types ici -->
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Trier par</mat-label>
            <mat-select [(ngModel)]="sortOption" (selectionChange)="onSortChange()">
              <mat-option value="nameAsc">Nom A-Z</mat-option>
              <mat-option value="nameDesc">Nom Z-A</mat-option>
              <mat-option value="hpAsc">HP asc</mat-option>
              <mat-option value="hpDesc">HP desc</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <p *ngIf="filteredProducts.length === 0" class="text-gray-500">Aucun résultat trouvé.</p>
        <div *ngFor="let p of filteredProducts">
          <app-product-card [product]="p" (addItemEvent)="addItem($event)"></app-product-card>
        </div>
      </div>
    </main>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  filter: { type: string; asc: boolean } = { type: '', asc: true };
  sortOption: string = 'nameAsc';
  countFav = 0;
  SearchContent = '';
  productService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private favoriteService: FavoriteService;

  constructor(
      favoriteService: FavoriteService,
      private searchPipe: SearchPipe,
      private sortByNamePipe: SortByNamePipe,
      private sortByHpPipe: SortByHpPipe,
      private filterByTypePipe: FilterByTypePipe
  ) {
    this.favoriteService = favoriteService;
  }

  addItem(event: number) {
    this.countFav += event;
  }

  onSearch(searchTerm: string) {
    this.searchEvent.emit(searchTerm);
    this.SearchContent = searchTerm;
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.filterByTypePipe.transform(this.products, this.filter.type);
    filtered = this.searchPipe.transform(filtered, this.SearchContent);
    if (this.sortOption === 'nameAsc' || this.sortOption === 'nameDesc') {
      filtered = this.sortByNamePipe.transform(filtered, this.sortOption === 'nameAsc');
    } else if (this.sortOption === 'hpAsc' || this.sortOption === 'hpDesc') {
      filtered = this.sortByHpPipe.transform(filtered, this.sortOption === 'hpAsc');
    }
    this.filteredProducts = filtered;
  }

  ngOnInit(): void {
    const favorites = this.favoriteService.getFavorites() || [];

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        products.forEach((product) => {
          product.isFavorite = favorites.some((fav) => fav && fav.id === product.id);
        });
        this.applyFilters();
      },
      error: (err) => console.error('Erreur lors du chargement des données:', err),
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }
}