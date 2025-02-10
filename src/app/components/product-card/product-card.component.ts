import { CurrencyPipe, UpperCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
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
      class="m-3 p-5 flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl cursor-pointer"
      (click)="navigateToProduct(product.id)"
    >
      <div class="flex justify-end w-full">
        <button
          mat-fab
          (click)="toggleFavorite()"
          class="hover:scale-110 transition-transform"
        >
          <mat-icon [class.text-red-500]="isFavorite">
            {{ isFavorite ? "favorite" : "favorite_border" }}
          </mat-icon>
        </button>
      </div>

      <mat-card-header
        class="flex flex-col-reverse justify-center items-center"
      >
        <img
          [src]="product.imgUrl"
          class="w-[200px] h-[280px] rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
        />
      </mat-card-header>

      <mat-card-content class="mt-5 space-y-4">
        <div class="flex justify-between items-center leading-5">
          <mat-card-title class="truncate text-lg font-bold text-gray-800">{{
            product.name.length > 12
              ? product.name.slice(0, 12) + "..."
              : (product.name | uppercase)
          }}</mat-card-title>
          <p>
            {{ product.middlePrice | currency : "EUR" }}
          </p>
        </div>

        <div class="space-y-2 text-gray-600">
          <p class="bg-gray-50 p-2 rounded-md">
            <span class="font-medium">Type:</span> {{ product.type.join(", ") }}
          </p>
          <p class="bg-gray-50 p-2 rounded-md">
            <span class="font-medium">Rareté:</span>
            <span class="ml-2 text-purple-600">{{ product.rarity }}</span>
          </p>
        </div>
      </mat-card-content>

      <mat-card-footer class="flex flex-col gap-3 mt-4">
        <app-add-panier [product]="product"></app-add-panier>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [],
})
export class ProductCardComponent implements OnInit {
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
