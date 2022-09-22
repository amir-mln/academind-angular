import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesResolver } from 'src/app/resolver/recipe.resolver';
import { RecipeComponent } from 'src/app/components/recipe/recipe.component';
import { RecipeFormComponent } from 'src/app/components/recipe-form/recipe-form.component';
import { RecipeEmptyComponent } from 'src/app/components/recipe-empty/recipe-empty.component';
import { RecipeDetailsComponent } from 'src/app/components/recipe-details/recipe-details.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    canActivate: [AuthGuard],
    resolve: { recipes: RecipesResolver },
    children: [
      { path: '', component: RecipeEmptyComponent },
      { path: 'new', component: RecipeFormComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
