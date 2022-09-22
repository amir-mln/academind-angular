import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./features/recipes/recipes.module').then(
        (module) => module.RecipeModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./features/shopping/shopping.module').then(
        (module) => module.ShoppingModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
