import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { PanierService } from '../../service/panier.service';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Product } from '../../product';
import {FormsModule} from "@angular/forms";
import {FormClientComponent} from "../../components/form-client/form-client.component";

@Component({
  selector: 'app-panier',
  imports: [
    CommonModule,
    DatePipe,
    MatFabButton,
    MatIcon,
    UpperCasePipe,
    FormsModule,
    FormClientComponent
  ],
  template: `
    <main class="flex items-center justify-around">
      
      <div>
      <h2 class="text-3xl m-5 p-5">Votre panier</h2>
      <div *ngFor="let product of products" class="p-5 flex flex-col md:flex-row gap-5 border rounded-md border-border m-3 justify-between items-center">

        <img mat-card-sm-image [src]="'assets/' + product.imgUrl" class="w-[100px] h-[150px]">

        <div>
          <h2>{{ product.name | uppercase }}</h2>
          <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
        </div>

        <div class="flex gap-3 items-center">
          <button mat-mini-fab color="primary" (click)="updateQuantity(product, (product.quantite ?? 0) - 1)">
            <mat-icon>remove</mat-icon>
          </button>

          <input
              [(ngModel)]="product.quantite"
              class="p-2 w-14 text-center border border-border rounded-full text-black"
              type="number"
              min="1"
              (change)="updateQuantity(product, product.quantite ?? 0)">

          <button mat-mini-fab color="primary" (click)="updateQuantity(product, (product.quantite ?? 0) + 1)">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <button mat-fab extended color="primary" (click)="deleteProduct(product)">
          <mat-icon>delete</mat-icon>
          Supprimer
        </button>
      </div>
      </div>

      <app-form-client></app-form-client>
    </main>
  `,
  styles: ``
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
}