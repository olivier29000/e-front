import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdministrationComponent } from './accueil/administration/administration.component';
import { GestionDesCalendriersComponent } from './accueil/gestion-des-calendriers/gestion-des-calendriers.component';
import { GestionPanneauAffichageComponent } from './accueil/gestion-panneau-affichage/gestion-panneau-affichage.component';
import { MonCalendrierComponent } from './accueil/mon-calendrier/mon-calendrier.component';
import { LoginComponent } from './login/login.component';
import { PanneauAffichageComponent } from './panneau-affichage/panneau-affichage.component';
import { ConnexionGuardService } from './services/connexion-guard.service';

const routes: Routes = [
  { path: '', component: PanneauAffichageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil', component: AccueilComponent }
    ]
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/administration', component: AdministrationComponent }
    ],
    data : {
      url : 'administration'
    }
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/mon-calendrier', component: MonCalendrierComponent }
    ],
    data : {
      url : 'mon-calendrier'
    }
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/gestion-des-calendriers', component: GestionDesCalendriersComponent }
    ],
    data : {
      url : 'gestion-des-calendriers'
    }
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/gestion-panneau-affichage', component: GestionPanneauAffichageComponent }
    ],
    data : {
      url : 'gestion-panneau-affichage'
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
