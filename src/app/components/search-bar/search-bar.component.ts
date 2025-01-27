import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <form class="example-form">
      <input matInput 
             class="border border-border p-3 rounded-full text-black" 
             type="search" 
             placeholder="Rechercher un personnage"
             [(ngModel)]="searchContent"
             [ngModelOptions]="{standalone: true}" 
             (ngModelChange)="onSearch($event)">
    </form>
  `,
  imports: [FormsModule],
  styles: ``
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchContent: string = '';

  onSearch(value: string) {
    this.searchEvent.emit(value);
  }
}