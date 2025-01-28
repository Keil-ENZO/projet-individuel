import { Component } from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <header class="py-5 px-8 bg-primary text-white flex justify-between">
            <nav class="flex items-center justify-between w-full">

            <h1 class="text-3xl">Harry Potter</h1>
                <ul class="flex gap-5">
                    <li><a routerLink="/"  class="cursor-pointer">Home</a></li>
                    <li><a routerLink="/favorites"  class="cursor-pointer">Favoris</a></li>
                    <li><a routerLink="/panier"  class="cursor-pointer">
                        <mat-icon>shopping_cart</mat-icon>
                    </a></li>
                </ul>
            </nav>

        </header>
    `,
    imports: [
        RouterLink,
        MatIcon
    ],
    styles: []
})
export class HeaderComponent {

}