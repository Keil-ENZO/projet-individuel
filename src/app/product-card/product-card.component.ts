import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { Product } from "../product";
import { DatePipe, UpperCasePipe } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatCardTitle} from "@angular/material/card";
import {ProductService} from "../service/product.service";

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
    MatCardTitle
  ],
  template: `

    <mat-card appearance="outlined" class="m-3 flex flex-col items-center">
      <div class=" flex w-full justify-end">
          <mat-icon (click)="makeFavorite()" class="m-3">{{ product.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
      </div>
        <mat-card-header>
            <mat-card-title>{{ product.name | uppercase }}</mat-card-title>
        </mat-card-header>
      
        <mat-card-content>
          <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
        </mat-card-content>
        
    </mat-card>


  `,
  styles: []
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product = { id: 0, name: '', isFavorite: false, createdDate: new Date() };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);

  makeFavorite() {
    this.productService.makeFavorite(this.product);
    this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
  }
}