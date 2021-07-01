import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AdministrationComponent } from './accueil/administration/administration.component';
import { GestionDesCalendriersComponent } from './accueil/gestion-des-calendriers/gestion-des-calendriers.component';
import { GestionFournisseursComponent } from './accueil/gestion-fournisseurs/gestion-fournisseurs.component';
import { ReponseFournisseurComponent } from './accueil/gestion-fournisseurs/reponse-fournisseur/reponse-fournisseur.component';
import { GestionPanneauAffichageComponent } from './accueil/gestion-panneau-affichage/gestion-panneau-affichage.component';
import { GestionTraiteurComponent } from './accueil/gestion-traiteur/gestion-traiteur.component';
import { MonCalendrierComponent } from './accueil/mon-calendrier/mon-calendrier.component';
import { MonCompteComponent } from './accueil/mon-compte/mon-compte.component';
import { LoginComponent } from './login/login.component';
import { ModificationCreationMotDePasseComponent } from './modification-creation-mot-de-passe/modification-creation-mot-de-passe.component';
import { PanneauAffichageComponent } from './panneau-affichage/panneau-affichage.component';
import { ConnexionGuardService } from './services/connexion-guard.service';

const routes: Routes = [
  { path: '', component: PanneauAffichageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modification-mot-de-passe/:cleUrl', component: ModificationCreationMotDePasseComponent },
  { path: 'reponse-fournisseur/:cleUrl', component: ReponseFournisseurComponent },
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
      { path: 'accueil/mon-compte', component: MonCompteComponent }
    ],
    data : {
      url : 'mon-compte'
    }
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
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/gestion-fournisseurs', component: GestionFournisseursComponent }
    ],
    data : {
      url : 'gestion-fournisseurs'
    }
  },
  {
    path: '',
    canActivate: [ConnexionGuardService],
    children: [
      { path: 'accueil/gestion-traiteur', component: GestionTraiteurComponent }
    ],
    data : {
      url : 'gestion-traiteur'
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
