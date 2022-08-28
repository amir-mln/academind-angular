import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInputRef', { static: true }) nameInput!: ElementRef;
  @ViewChild('amountInputRef', { static: true }) amountInput!: ElementRef;
  @Output() onFormSubmit = new EventEmitter<{ name: string; amount: number }>();

  constructor() {}
  ngOnInit(): void {}

  formSubmitHandler(e: SubmitEvent) {
    e.preventDefault();
    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;
    this.onFormSubmit.emit(new Ingredient(name, amount));
  }
}
