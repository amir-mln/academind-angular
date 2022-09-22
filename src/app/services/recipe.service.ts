import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable()
export class RecipeService {
  private prvRecipes: Recipe[] = [];
  onNewRecipe = new Subject<Recipe[]>();

  constructor(private shoppingService: ShoppingService) {}

  get recipes() {
    return Array.from(this.prvRecipes);
  }

  addIngredientsToShop(...ingredients: Ingredient[]) {
    this.shoppingService.addItem(...ingredients);
  }

  setRecipes(propRecipes: Recipe[]) {
    this.prvRecipes = propRecipes;
    this.onNewRecipe.next(this.recipes);
  }

  addRecipes(...recipes: Recipe[]) {
    this.prvRecipes.push(...recipes);
    this.onNewRecipe.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.prvRecipes[index] = recipe;
    this.onNewRecipe.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.prvRecipes.splice(index, 1);
    this.onNewRecipe.next(this.recipes);
  }
}
