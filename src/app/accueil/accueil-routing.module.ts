import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { GestionEmployeCourantComponent } from './gestion-employes/gestion-employe-courant/gestion-employe-courant.component';
import { GestionEmployesComponent } from './gestion-employes/gestion-employes.component';
import { GestionPanneauAffichageComponent } from './gestion-panneau-affichage/gestion-panneau-affichage.component';
import { MonCalendrierComponent } from './mon-calendrier/mon-calendrier.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'gestion-panneau-affichage', component: GestionPanneauAffichageComponent },
  { path: 'mon-calendrier', component: MonCalendrierComponent },
  { path: 'gestion-employes', component: GestionEmployesComponent },
  { path: 'gestion-employe/:idEmploye', component: GestionEmployeCourantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule {  }
