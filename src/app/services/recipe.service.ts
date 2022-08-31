import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingService } from './shopping.service';

@Injectable()
export class RecipeService {
  private prvRecipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  onSelectRecipe = new EventEmitter<Recipe>();

  constructor(private shoppingService: ShoppingService) {}
  get recipes() {
    return Array.from(this.prvRecipes);
  }
  addIngredientsToShop(...ingredients: Ingredient[]) {
    this.shoppingService.addItem(...ingredients);
  }
}
