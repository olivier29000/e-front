import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanneauAffichageComponent } from './panneau-affichage.component';
import { PanneauAffichageModule } from './panneau-affichage.module';

const routes: Routes = [
  { path: '', component: PanneauAffichageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanneauAffichageRoutingModule { }
