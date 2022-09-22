import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from 'src/app/components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-route.modules';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
