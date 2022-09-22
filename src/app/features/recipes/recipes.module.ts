import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailsComponent } from 'src/app/components/recipe-details/recipe-details.component';
import { RecipeEmptyComponent } from 'src/app/components/recipe-empty/recipe-empty.component';
import { RecipeFormComponent } from 'src/app/components/recipe-form/recipe-form.component';
import { RecipeItemComponent } from 'src/app/components/recipe-item/recipe-item.component';
import { RecipeListComponent } from 'src/app/components/recipe-list/recipe-list.component';
import { RecipeComponent } from 'src/app/components/recipe/recipe.component';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { RecipeRoutingModule } from './recipes-route.module';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeFormComponent,
    RecipeEmptyComponent,
    RecipeDetailsComponent,
  ],
  imports: [SharedModule, RecipeRoutingModule, ReactiveFormsModule],
})
export class RecipeModule {}
