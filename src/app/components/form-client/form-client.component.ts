import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-commande/dialog-commande.component';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-form-client',
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <form [formGroup]="formCommande" (ngSubmit)="openDialog()" class="flex flex-col">
      <h2 class="text-3xl m-5 p-5">Vos informations</h2>
      <label for="name">Nom</label>
      <input type="text" formControlName="name" class="p-2 border border-border rounded-md text-black">

      <label for="mail">Mail</label>
      <input type="email" formControlName="mail" class="p-2 border border-border rounded-md text-black">

      <label for="adresse">Adresse</label>
      <input type="text" formControlName="adresse" class="p-2 border border-border rounded-md text-black">

      <div class="w-full flex justify-center">
        <button [disabled]="!formCommande.valid" [ngClass]="{'bg-primary text-background': formCommande.valid, 'text-[#949397] bg-[#DFDEE1]': !formCommande.valid}" class="mt-5 p-3 rounded-md w-[200px] border border-border">
          Commander
        </button>
      </div>
    </form>
  `,
})
export class FormClientComponent {
  formCommande = new FormGroup({
    name: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', Validators.required),
  });

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const formData = this.formCommande.value;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        name: formData.name,
        mail: formData.mail,
        adresse: formData.adresse,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
      if (result) {
        console.log('Result:', result);
      }
    });
  }
}