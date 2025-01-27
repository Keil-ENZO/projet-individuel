import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Product} from "../../product";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ProductCardComponent} from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-product-list-detail',
  imports: [
    ProductCardComponent
  ],
  template: `
    <main class="flex justify-center items-start">
      <div class="flex justify-center items-center">
        <app-product-card [product]=product (addItemEvent)="addItem($event)"/>

      </div>

    </main>
  `,
  styles: ``
})
export class ProductListDetailComponent {
  @Input({ required: true }) product: Product = { id: 0, name: '', isFavorite: false, createdDate: new Date(), imgUrl: '' };
  @Output() addItemEvent = new EventEmitter<number>();
  countFav = 0;

  productService = inject(ProductService);

  addItem(event: number) {
    this.countFav += event;
  }

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(params['id']);
    });
  }
}
