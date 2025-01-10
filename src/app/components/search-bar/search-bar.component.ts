import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    MatLabel
  ],
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Favorite food</mat-label>
        <input matInput placeholder="Ex. Pizza" value="Sushi">
      </mat-form-field>
    </form>

  `,
  styles: ``
})
export class SearchBarComponent {

}


