import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/features/shared/shared.module';
import { ShoppingListComponent } from 'src/app/components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/components/shopping-edit/shopping-edit.component';
import { ShoppingRoutingModule } from './shopping-route.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedModule, FormsModule, ShoppingRoutingModule],
})
export class ShoppingModule {}
