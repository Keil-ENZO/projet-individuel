import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./layout/Footer";
import {HeaderComponent} from "./layout/Header";
import {ProductService} from "./service/product.service";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  template: `
    <div class="h-screen flex justify-between flex-col">

      <app-header></app-header>
      
      <router-outlet/>
      
      <app-footer></app-footer>
    </div>


  `,
  styles: [],
})
export class AppComponent {
}