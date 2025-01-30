import { CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";
import { ProductService } from "../../service/product.service";
import { AddPanierComponent } from "../add-panier/add-panier.component";

@Component({
  selector: "app-product-card",
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
    AddPanierComponent,
    CurrencyPipe,
  ],
  template: `
    <mat-card
      appearance="outlined"
      class="m-3 p-5 flex flex-col justify-between items-center w-[350px] h-[500px]"
    >
      <div class="flex justify-end w-full">
        <button mat-fab (click)="toggleFavorite()">
          <mat-icon>{{ isFavorite ? "favorite" : "favorite_border" }}</mat-icon>
        </button>
      </div>

      <mat-card-header
        class="flex flex-col-reverse justify-center items-center"
      >
        <img [src]="product.imgUrl" class="w-[200px] h-[280px]" />
        <mat-card-title>{{ product.name | uppercase }}</mat-card-title>
      </mat-card-header>

      <mat-card-content class="text-center">
        <p>HP: {{ product.hp }}</p>
        <p>Attaque: {{ product.attaque }}</p>
        <p>Type: {{ product.type.join(", ") }}</p>
        <p>Rareté: {{ product.rarity }}</p>
        <p>Prix: {{ product.middlePrice | currency : "EUR" }}</p>
      </mat-card-content>

      <mat-card-footer class="flex flex-col gap-3">
        <button
          mat-fab
          extended
          color="primary"
          (click)="navigateToProduct(product.id)"
        >
          <mat-icon>visibility</mat-icon>
          Voir le produit
        </button>

        <app-add-panier [product]="product"></app-add-panier>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);
  favoriteService = inject(FavoriteService);
  protected router = inject(Router);

  isFavorite = false;

  ngOnInit() {
    if (this.product) {
      this.isFavorite = this.favoriteService
        .getFavorites()
        .some((p) => p.id === this.product.id);
    }
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
    this.router.navigate(["/product", id]);
  }
}
