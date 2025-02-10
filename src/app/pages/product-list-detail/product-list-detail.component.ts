import { CurrencyPipe, NgIf, UpperCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import { MatCardSmImage } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { AddPanierComponent } from "../../components/add-panier/add-panier.component";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";
import { ProductService } from "../../service/product.service";

@Component({
  selector: "app-product-list-detail",
  imports: [
    MatFabButton,
    MatIcon,
    UpperCasePipe,
    AddPanierComponent,
    CurrencyPipe,
    NgIf,
    MatCardSmImage,
  ],
  template: `
    <main class="flex justify-center mb-32">
      <div
        *ngIf="product; else errorTemplate"
        class="flex flex-col justify-center gap-5"
      >
        <div class="flex flex-col items-center p-6 max-w-md">
          <div class="flex justify-end w-full mb-4">
            <button
              mat-fab
              (click)="toggleFavorite()"
              class="hover:scale-110 transition-transform"
            >
              <mat-icon>{{
                isFavorite ? "favorite" : "favorite_border"
              }}</mat-icon>
            </button>
          </div>
          <img
            mat-card-sm-image
            [src]="product.imgUrl"
            class="w-[200px] h-[300px] rounded-lg shadow-md hover:scale-105 transition-transform"
          />
          <div class="mt-6 w-full space-y-4">
            <h2 class="text-2xl font-semibold text-center text-gray-800">
              {{ product.name | uppercase }}
            </h2>
            <p class="text-xl text-center">
              {{ product.middlePrice | currency : "EUR" }}
            </p>
            <div class="grid grid-cols-2 gap-4 text-gray-600">
              <div class="bg-gray-50 p-3 rounded-md">
                <span class="font-medium">Numéro:</span> {{ product.number }}
              </div>
              <div class="bg-gray-50 p-3 rounded-md">
                <span class="font-medium">HP:</span> {{ product.hp }}
              </div>
              <div class="bg-gray-50 p-3 rounded-md">
                <span class="font-medium">Type:</span> {{ product.type }}
              </div>
              <div class="bg-gray-50 p-3 rounded-md">
                <span class="font-medium">Attaque:</span> {{ product.attaque }}
              </div>
            </div>
            <div class="bg-gray-50 p-3 rounded-md text-center">
              <span class="font-medium">Rareté:</span>
              <span class="ml-2 text-purple-600">{{ product.rarity }}</span>
            </div>
          </div>
          <div class="mt-6 w-full">
            <app-add-panier [product]="product"></app-add-panier>
          </div>
        </div>
      </div>
      <ng-template #errorTemplate>
        <h2 class="text-3xl m-5 p-5">Produit non trouvé</h2>
      </ng-template>
    </main>
  `,
  styles: ``,
})
export class ProductListDetailComponent implements OnInit {
  @Input({ required: true }) product: Product | null = null;
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);
  favoriteService = inject(FavoriteService);

  isFavorite = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.productService.getProductById(params["id"]).subscribe(
        (productData) => {
          this.product = productData;
          this.checkFavoriteStatus();
        },
        (error) => {
          this.product = null;
        }
      );
    });
  }

  ngOnInit() {
    this.checkFavoriteStatus();
  }

  checkFavoriteStatus() {
    if (this.product) {
      this.isFavorite = this.favoriteService
        .getFavorites()
        .some((p) => p.id === this.product!.id);
    }
  }

  toggleFavorite() {
    if (this.product) {
      if (this.isFavorite) {
        this.favoriteService.removeFavorite(this.product);
      } else {
        this.favoriteService.addFavorite(this.product);
      }
      this.isFavorite = !this.isFavorite;
      this.addItemEvent.emit(this.isFavorite ? 1 : -1);
    }
  }
}
