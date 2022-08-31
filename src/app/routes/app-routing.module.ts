import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from '../components/recipe-details/recipe-details.component';
import { RecipeEmptyComponent } from '../components/recipe-empty/recipe-empty.component';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form.component';

import { RecipeComponent } from '../components/recipe/recipe.component';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipe',
    pathMatch: 'full',
  },
  {
    path: 'recipe',
    component: RecipeComponent,
    children: [
      { path: '', component: RecipeEmptyComponent },
      { path: 'new', component: RecipeFormComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: RecipeFormComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
