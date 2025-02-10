// src/app/pipe/sort-by-name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {
  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return asc ? -1 : 1;
      if (nameA > nameB) return asc ? 1 : -1;
      return 0;
    });
  }
}