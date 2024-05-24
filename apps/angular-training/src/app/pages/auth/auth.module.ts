import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorModule } from '../../shared/ui';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule, ReactiveFormsModule, FormsModule , ControlErrorModule],
})
export class AuthModule {}
