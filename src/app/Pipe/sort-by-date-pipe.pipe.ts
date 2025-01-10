import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "../product";

@Pipe({
  name: 'SortByDatePipe'
})
export class SortByDatePipe implements PipeTransform {

  transform(products: Product[] | null, asc: boolean = true): Product[] {
    if (!products) {
      return [];
    }
    return products.sort((a, b) => {
      return asc
          ? a.createdDate.getTime() - b.createdDate.getTime()
          : b.createdDate.getTime() - a.createdDate.getTime();
    });
  }
}