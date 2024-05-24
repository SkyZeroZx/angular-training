import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components';

const route: Routes = [{ path: '', component: ErrorComponent }];

@NgModule({
	imports: [RouterModule.forChild(route)],
	exports: [RouterModule]
})
export class ErrorRoutingModule {}
