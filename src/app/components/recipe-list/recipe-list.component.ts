import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription!: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipesSubscription = this.recipeService.onNewRecipe.subscribe(
      (newRecipes) => (this.recipes = newRecipes)
    );
  }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  onNewRecipeClick(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
