// src/app/pipe/sort-by-hp.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'sortByHp'
})
export class SortByHpPipe implements PipeTransform {
  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      const hpA = parseInt(a.hp, 10);
      const hpB = parseInt(b.hp, 10);
      return asc ? hpA - hpB : hpB - hpA;
    });
  }
}