import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

export interface DialogData {
  name: string;
  mail: string;
  adresse: string;
}

@Component({
  selector: 'app-dialog-commande',
  template: `
    <div class="p-5">
    <h2 mat-dialog-title>Confirmation de Commande</h2>
    <mat-dialog-content>
      <p><strong>Nom:</strong> {{ data.name }}</p>
      <p><strong>Email:</strong> {{ data.mail }}</p>
      <p><strong>Adresse de Livraison:</strong> {{ data.adresse }}</p>
    </mat-dialog-content>
    <mat-dialog-actions class="flex gap-3">
      <button mat-button (click)="onNoClick()">Annuler</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Confirmer</button>
    </mat-dialog-actions>

    </div>
  `,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogContent, MatDialogActions, MatDialogClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExampleDialog {
  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}