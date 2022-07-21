import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeatonComponent } from './views/peaton/peaton.component';
import { VehiculoComponent } from './views/vehiculo/vehiculo.component';

const routes: Routes = [
  { path: '', component:VehiculoComponent },
  {path:'vehiculo', component: VehiculoComponent},
  {path:'peaton',component: PeatonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
