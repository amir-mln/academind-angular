import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingService {
  private list: Ingredient[] = [];
  onNewIngredient = new Subject<Ingredient[]>();

  constructor() {}
  get ingredients() {
    return Array.from(this.list);
  }
  addItem(...ingredients: Ingredient[]) {
    this.list.push(...ingredients);
    this.onNewIngredient.next(this.ingredients);
  }
}
