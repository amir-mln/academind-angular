import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { PortalDirective } from './directives/portal/portal.directive';

@NgModule({
  declarations: [AlertComponent, DropdownDirective, PortalDirective],
  imports: [CommonModule],
  exports: [AlertComponent, DropdownDirective, PortalDirective, CommonModule],
})
export class SharedModule {}
