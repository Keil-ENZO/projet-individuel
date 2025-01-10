import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "../product";

@Pipe({
  name: 'SortByNamePipe'
})
export class SortByNamePipe implements PipeTransform {

  transform(products: Product[] | null, asc: boolean = true): Product[] {
    if (!products) {
      return [];
    }

    return products.sort((a, b) => {
      return asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
    });
  }

}
