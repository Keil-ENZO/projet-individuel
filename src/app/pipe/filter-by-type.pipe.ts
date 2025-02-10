// src/app/pipe/filter-by-type.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {
  transform(products: Product[], type: string): Product[] {
    if (!type) return products;
    return products.filter(product => product.type.includes(type));
  }
}