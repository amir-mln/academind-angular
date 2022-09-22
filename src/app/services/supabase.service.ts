import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, exhaustMap, map, switchMap, take, tap } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';
import { ShoppingService } from './shopping.service';

@Injectable({ providedIn: 'root' })
class SupabaseService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shopService: ShoppingService,
    private recipeService: RecipeService
  ) {}

  fetchAllIngredients() {
    return this.http
      .get<Ingredient[]>('/ingredients')
      .pipe(tap((ingredients) => this.shopService.setItems(...ingredients)));
  }

  fetchAllRecipe() {
    let cachedRecipes: Recipe[] = [];

    return this.authService.userProfileSubject.pipe(
      take(1),
      exhaustMap((_) => this.http.get<Recipe[]>('/recipes')),
      tap((recipes) => (cachedRecipes = recipes)),
      exhaustMap(this.fetchAllIngredients.bind(this)),
      map((ingredients) =>
        cachedRecipes.map((recipe) => ({
          ...recipe,
          ingredients: ingredients.filter(
            ({ recipe_id }) => recipe_id === recipe.id
          ),
        }))
      ),
      tap(this.recipeService.setRecipes.bind(this.recipeService))
    );
  }

  updateIngredients(...ingredients: Ingredient[]) {
    const patchOptions = {
      headers: { Prefer: 'return=representation' },
    };

    return concat(
      ...ingredients.map(({ id, ...rest }) =>
        this.http.patch<Ingredient>(
          `/ingredients?id=eq.${id}`,
          rest,
          patchOptions
        )
      )
    ).pipe(tap((_) => this.fetchAllIngredients()));
  }

  updateRecipe({ ingredients, id, ...rest }: Recipe) {
    const patchOptions = {
      headers: { Prefer: 'return=representation' },
    };

    return this.http
      .patch<Recipe>(`/recipes?id=eq.${id}`, rest, patchOptions)
      .pipe(tap((_) => this.updateIngredients(...ingredients).subscribe()));
  }

  postRecipes(...recipes: Recipe[]) {
    const modifiedRecipe = recipes.map(({ ingredients, ...rest }) => rest);
    return this.http
      .post<Recipe[]>('/recipes', modifiedRecipe)
      .pipe(map(console.log));
  }
}

export { SupabaseService };
