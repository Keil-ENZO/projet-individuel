import { CommonModule, NgForOf, NgIf, SlicePipe } from "@angular/common";
import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FilterByTypePipe } from "../../pipe/filter-by-type.pipe";
import { SearchPipe } from "../../pipe/search.pipe";
import { SortByHpPipe } from "../../pipe/sort-by-hp.pipe";
import { SortByNamePipe } from "../../pipe/sort-by-name.pipe";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";
import { ProductService } from "../../service/product.service";

@Component({
  selector: "app-product-list",
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
    NgIf,
    NgForOf,
    SlicePipe,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [SearchPipe, SortByNamePipe, SortByHpPipe, FilterByTypePipe],
  template: `
    <main class="mt-20">
      <div class="flex justify-between items-center md:mx-32">
        <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>

        <div class="flex gap-3">
          <mat-form-field>
            <mat-label>Trier par</mat-label>
            <mat-select
              [(ngModel)]="sortOption"
              (selectionChange)="onSortChange()"
            >
              <mat-option value="nameAsc">Nom A-Z</mat-option>
              <mat-option value="nameDesc">Nom Z-A</mat-option>
              <mat-option value="hpAsc">HP asc</mat-option>
              <mat-option value="hpDesc">HP desc</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Filtres par type</mat-label>
            <mat-select
              [(ngModel)]="filter.type"
              (selectionChange)="onFilterChange()"
            >
              <mat-option value="">Tous</mat-option>
              <mat-option value="Fire">Feu</mat-option>
              <mat-option value="Water">Eau</mat-option>
              <mat-option value="Grass">Plante</mat-option>
              <mat-option value="Electric">Electrique</mat-option>
              <mat-option value="Psychic">Psy</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-5 min-h-screen">
        <mat-spinner
          diameter="50"
          *ngIf="filteredProducts.length === 0"
        ></mat-spinner>

        <app-product-card
          *ngFor="
            let product of filteredProducts | slice : startIndex : endIndex;
            trackBy: trackById
          "
          [product]="product"
          (addItemEvent)="addItem($event)"
        ></app-product-card>
      </div>

      <mat-paginator
        class="mt-4"
        [length]="(products | search : SearchContent).length"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25, 100]"
        (page)="onPageChange($event)"
        aria-label="Sélectionner la page"
      >
      </mat-paginator>
    </main>
  `,
  styles: [],
})
export class ProductListComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  filter: { type: string; asc: boolean } = { type: "", asc: true };
  sortOption: string = "nameAsc";
  countFav = 0;
  SearchContent = "";
  productService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private favoriteService: FavoriteService;
  pageSize = 10;
  currentPage = 0;
  startIndex = 0;
  endIndex = 10;

  get paginatedProducts(): Product[] {
    const startIndex = this.currentPage * this.pageSize;
    const searchResults = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.SearchContent.toLowerCase())
    );
    this.filteredProducts = searchResults;
    return searchResults.slice(startIndex, startIndex + this.pageSize);
  }

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
    this.SearchContent = searchTerm;
    this.currentPage = 0;
    this.updatePagination();

    this.applyFilters();
  }

  updatePagination() {
    this.startIndex = this.currentPage * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  onFilterChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.filterByTypePipe.transform(
      this.products,
      this.filter.type
    );
    filtered = this.searchPipe.transform(filtered, this.SearchContent);
    if (this.sortOption === "nameAsc" || this.sortOption === "nameDesc") {
      filtered = this.sortByNamePipe.transform(
        filtered,
        this.sortOption === "nameAsc"
      );
    } else if (this.sortOption === "hpAsc" || this.sortOption === "hpDesc") {
      filtered = this.sortByHpPipe.transform(
        filtered,
        this.sortOption === "hpAsc"
      );
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
          product.isFavorite = favorites.some(
            (fav) => fav && fav.id === product.id
          );
        });
        this.applyFilters();
      },
      error: (err) =>
        console.error("Erreur lors du chargement des données:", err),
    });
  }

  trackById(index: number, item: Product) {
    return item.id;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.startIndex = this.currentPage * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
}
