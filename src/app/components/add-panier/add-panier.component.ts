import { Component, inject, Input } from '@angular/core';
import { PanierService } from "../../service/panier.service";
import { FormsModule } from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-add-panier',
  imports: [FormsModule, MatIcon, MatFabButton],
  standalone: true,
  template: `
    <div class="flex gap-3 items-center">
      <input 
        [(ngModel)]="quantite" 
        class="p-2 w-28 h-12 border border-border rounded-full text-black" 
        type="number" 
        min="1" 
        value="1"
      >
      
      <button mat-fab extended color="primary" (click)="addItemPanier()">
      <mat-icon>add_shopping_cart</mat-icon>
      Ajouter au panier
      </button>
      
    </div>
  `,
  styles: ``
})
export class AddPanierComponent {
  panierService = inject(PanierService);
  @Input() product!: any;
  quantite: number = 1;

  addItemPanier() {
    if (this.quantite < 1) {
      this.quantite = 1;
    }
    this.panierService.addProductToPanier(this.product, this.quantite);
  }
}