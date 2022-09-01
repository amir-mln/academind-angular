import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  selectedRecipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(
      ({ id: index }) =>
        (this.selectedRecipe = this.recipeService.recipes[index])
    );
  }
  onToShopClick(e: MouseEvent) {
    e.preventDefault();
    this.recipeService.addIngredientsToShop(...this.selectedRecipe.ingredients);
  }
  onEditClick(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
