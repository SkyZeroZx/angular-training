import { ButtonComponent, ControlErrorModule } from '@/shared/ui';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlErrorModule,
    ButtonComponent,
  ],
})
export class AuthModule {}
