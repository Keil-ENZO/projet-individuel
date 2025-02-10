import { CurrencyPipe, NgForOf, NgIf, UpperCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AddPanierComponent } from "../../components/add-panier/add-panier.component";
import { Product } from "../../product";
import { FavoriteService } from "../../service/favorite.service";
import { ProductService } from "../../service/product.service";
import { MatCardSmImage } from "@angular/material/card";

@Component({
  selector: "app-product-list-detail",
  imports: [
    MatFabButton,
    MatIcon,
    UpperCasePipe,
    AddPanierComponent,
    CurrencyPipe,
    RouterLink,
    NgForOf,
    NgIf,
    MatCardSmImage,
  ],
  template: `
    <main class="flex justify-center mb-32">
      <div *ngIf="product; else errorTemplate" class="flex flex-col justify-center gap-5">
        <div class="flex justify-end w-full">
          <button mat-fab (click)="toggleFavorite()">
            <mat-icon>{{ isFavorite ? "favorite" : "favorite_border" }}</mat-icon>
          </button>
        </div>
        <img
            mat-card-sm-image
            [src]="'assets/' + product.imgUrl"
            class="w-[200px] h-[300px]"
        />
        <h2 class="text-xl">{{ product.name | uppercase }}</h2>
        <p>{{ product.middlePrice | currency : "EUR" }}</p>
        <app-add-panier [product]="product"></app-add-panier>
        <div *ngIf="product.evolvesTo && product.evolvesTo.length > 0">
          <h3>Évolutions</h3>
          <ul>
            <li *ngFor="let evolution of product.evolvesTo">
              <a [routerLink]="['/product', evolution]">{{ evolution }}</a>
            </li>
          </ul>
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
      this.productService
          .getProductById(params["id"])
          .subscribe(
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