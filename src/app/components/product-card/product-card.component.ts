import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { Product } from "../../product";
import { DatePipe, UpperCasePipe } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatCardTitle} from "@angular/material/card";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product-card',
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
    MatCardFooter
  ],
  template: `

    <mat-card appearance="outlined" class="m-3 p-5 flex flex-col justify-between items-center w-[300px] h-[350px]">
      
        <mat-card-header class="flex flex-col-reverse justify-center items-center">
          <img mat-card-sm-image [src]="'assets/' + product.imgUrl" class="w-[100px] h-[150px]">          
            <mat-card-title>{{ product.name | uppercase }}</mat-card-title>
        </mat-card-header>
      
        <mat-card-content>
          <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
        </mat-card-content>
        
      <mat-card-footer>
        <button mat-fab extended (click)="makeFavorite()">
          <mat-icon>{{ product.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
          {{ product.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
        </button>
      </mat-card-footer>
    </mat-card>


  `,
  styles: []
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product = { id: 0, name: '', isFavorite: false, createdDate: new Date(), imgUrl: '' };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);

  makeFavorite() {
    this.productService.makeFavorite(this.product);
    this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
  }
}