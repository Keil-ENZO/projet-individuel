import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, UpperCasePipe} from "@angular/common";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-product-list-detail',
  imports: [
    DatePipe,
    MatFabButton,
    MatIcon,
    UpperCasePipe
  ],
  template: `
    <main class="flex justify-center mb-32">

      <div class="flex flex-col justify-center gap-5">
        
        <div class="flex justify-end w-full">
          <button mat-fab (click)="makeFavorite()">
            <mat-icon>{{ product.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
          </button>
        </div>

        <img mat-card-sm-image [src]="'assets/' + product.imgUrl" class="w-[200px] h-[300px]">

        <h2 class="text-xl">{{ product.name | uppercase }}</h2>
        <p>{{ product.createdDate | date:'fullDate' : '' : 'fr-FR' }}</p>
      </div>

    </main>
  `,
  styles: ``
})
export class ProductListDetailComponent implements OnInit {
  @Input({ required: true }) product: Product = { id: 0, name: '', isFavorite: false, createdDate: new Date(), imgUrl: '' };
  @Output() addItemEvent = new EventEmitter<number>();

  productService = inject(ProductService);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(params['id']);
    });
  }

  makeFavorite() {
    this.productService.makeFavorite(this.product);
    this.addItemEvent.emit(this.product.isFavorite ? 1 : -1);
    let favProducts = JSON.parse(localStorage.getItem('favProducts') || '[]');
    if (this.product.isFavorite) {
      favProducts.push(this.product);
    } else {
      favProducts = favProducts.filter((p: Product) => p.id !== this.product.id);
    }
    localStorage.setItem('favProducts', JSON.stringify(favProducts));

  }


  ngOnInit() {
    let favProducts = JSON.parse(localStorage.getItem('favProducts') || '[]');
    this.product.isFavorite = favProducts.some((p: Product) => p.id === this.product.id);
  }


}
