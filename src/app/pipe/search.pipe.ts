// src/app/pipe/search.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}