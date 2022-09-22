import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingService {
  private list: Ingredient[] = [];
  onNewIngredient = new Subject<Ingredient[]>();
  onNewEditingItem = new Subject<number>();

  constructor() {}
  get ingredients() {
    return Array.from(this.list);
  }
  setItems(...ingredients: Ingredient[]) {
    this.list = ingredients;
    this.onNewIngredient.next(this.ingredients);
  }
  addItem(...ingredients: Ingredient[]) {
    this.list.push(...ingredients);
    this.onNewIngredient.next(this.ingredients);
  }
  updateByIndex(index: number, newValues: Ingredient) {
    this.list[index] = newValues;
    this.onNewIngredient.next(this.ingredients);
  }
  deleteByIndex(index: number) {
    this.list.splice(index, 1);
    this.onNewIngredient.next(this.ingredients);
  }
}
