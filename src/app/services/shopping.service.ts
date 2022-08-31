import { EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingService {
  private list: Ingredient[] = [];
  onNewIngredient = new EventEmitter<Ingredient[]>();

  constructor() {}
  get ingredients() {
    return Array.from(this.list);
  }
  addItem(...ingredients: Ingredient[]) {
    this.list.push(...ingredients);
    this.onNewIngredient.emit(this.ingredients);
  }
}
