import { NgForOf, NgIf, SlicePipe } from "@angular/common";
import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelect } from "@angular/material/select";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { SearchPipe } from "../../pipe/search.pipe";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";
import { ProductService } from "../../service/product.service";

@Component({
  selector: "app-product-list",
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ProductCardComponent,
    FormsModule,
    SearchBarComponent,
    SearchPipe,
    NgIf,
    NgForOf,
    SlicePipe,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  template: `
    <main class="mt-20">
      <div class="flex justify-between items-center md:mx-32">
        <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>

        <div class="flex">
          <mat-form-field>
            <mat-label>Filtres</mat-label>
            <mat-select [(ngModel)]="filter">
              <!-- Filtre a ajouter -->
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-5">
        <mat-spinner *ngIf="filteredProducts.length === 0"></mat-spinner>

        <app-product-card
          *ngFor="let p of paginatedProducts; trackBy: trackById"
          [product]="p"
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
  styles: ``,
})
export class ProductListComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  filter: { type: string; asc: boolean } = { type: "", asc: true };
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

  addItem(event: number) {
    this.countFav += event;
  }

  onSearch(searchTerm: string) {
    this.SearchContent = searchTerm;
    this.currentPage = 0;
    this.updatePagination();
  }

  updatePagination() {
    this.startIndex = this.currentPage * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }

  constructor(favoriteService: FavoriteService) {
    this.favoriteService = favoriteService;
  }

  ngOnInit(): void {
    const favorites = this.favoriteService.getFavorites();

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        products.forEach((product) => {
          product.isFavorite = favorites.some((fav) => fav.id === product.id);
        });
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
