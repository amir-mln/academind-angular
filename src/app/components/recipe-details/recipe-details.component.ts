import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  @Input() selectedRecipe!: Recipe;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {}
  onToShopClick(e: MouseEvent) {
    e.preventDefault();
    this.recipeService.addIngredientsToShop(...this.selectedRecipe.ingredients);
  }
}
