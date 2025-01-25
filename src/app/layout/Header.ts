import { Component, EventEmitter, Output } from "@angular/core";
import { SearchBarComponent } from "../components/search-bar/search-bar.component";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <header class="p-5 bg-primary text-white flex justify-between">
            <h1 class="text-3xl">Harry Potter</h1>

            <app-search-bar (searchEvent)="onSearch($event)"></app-search-bar>
        </header>
    `,
    imports: [SearchBarComponent],
    styles: []
})
export class HeaderComponent {
    @Output() searchEvent = new EventEmitter<string>();

    onSearch(searchTerm: string) {
        this.searchEvent.emit(searchTerm);
    }
}