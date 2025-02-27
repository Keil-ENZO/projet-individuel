import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PanierService } from "../../service/panier.service";
import { DialogOverviewExampleDialog } from "../dialog-commande/dialog-commande.component";

@Component({
  selector: "app-form-client",
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <form
      [formGroup]="formCommande"
      (ngSubmit)="openDialog()"
      class="flex flex-col"
    >
      <h2 class="text-3xl m-5 p-5">Vos informations</h2>
      <label for="name">Nom</label>
      <input
        type="text"
        formControlName="name"
        class="p-2 border border-border rounded-md text-black"
      />

      <label for="mail">Mail</label>
      <input
        type="email"
        formControlName="mail"
        class="p-2 border border-border rounded-md text-black"
      />

      <label for="adresse">Adresse</label>
      <input
        type="text"
        formControlName="adresse"
        class="p-2 border border-border rounded-md text-black"
      />

      <div class="w-full flex justify-center">
        <button
          [disabled]="!formCommande.valid"
          [ngClass]="{
            'bg-primary text-background': formCommande.valid,
            'text-[#949397] bg-[#DFDEE1]': !formCommande.valid
          }"
          class="mt-5 p-3 rounded-md w-[200px] border border-border"
        >
          Commander
        </button>
      </div>
    </form>
  `,
})
export class FormClientComponent {
  formCommande = new FormGroup({
    name: new FormControl("", Validators.required),
    mail: new FormControl("", [Validators.required, Validators.email]),
    adresse: new FormControl("", Validators.required),
  });

  @Input() totalPrice: number = 0;
  @Output() panierCleared = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private panierService: PanierService) {}

  openDialog() {
    const formData = this.formCommande.value;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        name: formData.name,
        mail: formData.mail,
        adresse: formData.adresse,
        totalPrice: this.totalPrice,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.panierService.clearPanier();
        this.formCommande.reset({
          name: "",
          mail: "",
          adresse: "",
        });
        this.panierCleared.emit();
      }
    });
  }
}
