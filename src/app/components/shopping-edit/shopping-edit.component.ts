import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode: boolean = false;
  editingIndex: number = -1;
  @ViewChild('editForm') editForm!: NgForm;

  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.subscription = this.shoppingService.onNewEditingItem.subscribe(
      (editIndex) => {
        const ingredient = this.shoppingService.ingredients[editIndex];
        this.editMode = true;
        this.editingIndex = editIndex;
        this.editForm.setValue(ingredient);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  formSubmitHandler(form: NgForm) {
    const { name, amount } = form.value;
    if (!this.editMode)
      this.shoppingService.addItem(new Ingredient(name, amount));
    else this.shoppingService.updateByIndex(this.editingIndex, form.value);

    this.formResetHandler(this.editForm);
  }

  formResetHandler(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.editingIndex = -1;
  }

  formDeleteHandler(form: NgForm) {
    this.shoppingService.deleteByIndex(this.editingIndex);
    this.formResetHandler(form);
  }
}
