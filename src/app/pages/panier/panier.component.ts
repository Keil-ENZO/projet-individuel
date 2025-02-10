import { CommonModule, UpperCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { FormClientComponent } from "../../components/form-client/form-client.component";
import { Product } from "../../product";
import { PanierService } from "../../service/panier.service";

@Component({
  selector: "app-panier",
  imports: [
    CommonModule,
    MatFabButton,
    MatIcon,
    UpperCasePipe,
    FormsModule,
    FormClientComponent,
  ],
  template: `
    <main class="flex mt-20 justify-around min-h-screen">
      @if (products.length === 0) {
      <p class="text-xl text-gray-600">Aucun produit ajouter a votre panier</p>

      } @else {
      <div>
        <h2 class="text-xl text-gray-600">Votre panier:</h2>

        <div>
          <div
            *ngFor="let product of products"
            class="p-5 flex flex-col md:flex-row gap-5 border rounded-md border-border m-3 justify-between items-center"
          >
            <img
              mat-card-sm-image
              [src]="product.imgUrl"
              class="w-[100px] h-[150px]"
            />

            <div>
              <h2>{{ product.name | uppercase }}</h2>

              <p>{{ product.middlePrice | currency : "EUR" }}</p>
            </div>

            <div class="flex gap-3 items-center">
              <button
                mat-mini-fab
                color="primary"
                (click)="updateQuantity(product, product.quantite - 1)"
              >
                <mat-icon>remove</mat-icon>
              </button>

              <input
                [(ngModel)]="product.quantite"
                class="p-2 w-14 text-center border border-border rounded-full text-black"
                type="number"
                min="1"
                (change)="updateQuantity(product, product.quantite)"
              />

              <button
                mat-mini-fab
                color="primary"
                (click)="updateQuantity(product, product.quantite + 1)"
              >
                <mat-icon>add</mat-icon>
              </button>
            </div>

            <button
              mat-fab
              extended
              color="primary"
              (click)="deleteProduct(product)"
            >
              <mat-icon>delete</mat-icon>
              Supprimer
            </button>
          </div>
        </div>
        <div class="mx-24 p-5 flex justify-end">
          <h3 class="text-2xl">Total: {{ getTotal() | currency : "EUR" }}</h3>
        </div>
      </div>
      <app-form-client
        [totalPrice]="getTotal()"
        (panierCleared)="refreshPanier()"
      ></app-form-client>
      }
    </main>
  `,
  styles: ``,
})
export class PanierComponent implements OnInit {
  products: Product[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.products = this.panierService.getPanier();
  }

  updateQuantity(product: Product, newQuantity: number) {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    this.panierService.updateProductQuantity(product.id, newQuantity);
    this.products = this.panierService.getPanier();
  }

  deleteProduct(product: Product) {
    this.panierService.removeProductFromPanier(product);
    this.products = this.panierService.getPanier();
  }

  getTotal(): number {
    return this.products.reduce(
      (total, product) => total + product.middlePrice * product.quantite,
      0
    );
  }

  refreshPanier() {
    this.products = [];
    setTimeout(() => {
      this.products = this.panierService.getPanier();
    }, 0);
  }
}
