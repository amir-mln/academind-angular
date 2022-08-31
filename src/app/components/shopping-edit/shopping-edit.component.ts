import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInputRef', { static: true }) nameInput!: ElementRef;
  @ViewChild('amountInputRef', { static: true }) amountInput!: ElementRef;

  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {}
  formSubmitHandler(e: SubmitEvent) {
    e.preventDefault();
    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;
    this.shoppingService.addItem(new Ingredient(name, amount));
  }
}
