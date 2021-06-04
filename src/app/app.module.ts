import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ColorPickerComponent } from './accueil/color-picker/color-picker.component';
import { ModalColorPickerComponent } from './accueil/color-picker/modal-color-picker/modal-color-picker.component';
import { CommonModule } from '@angular/common';
import { MonCalendrierComponent } from './accueil/mon-calendrier/mon-calendrier.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NouisliderModule } from 'ng2-nouislider';
import { AdministrationComponent } from './accueil/administration/administration.component';
import { NouvelEmployeComponent } from './accueil/administration/nouvel-employe/nouvel-employe.component';
import { GestionDesCalendriersComponent } from './accueil/gestion-des-calendriers/gestion-des-calendriers.component';
import { NouvelEventComponent } from './accueil/gestion-des-calendriers/nouvel-event/nouvel-event.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { GestionPanneauAffichageComponent } from './accueil/gestion-panneau-affichage/gestion-panneau-affichage.component';
import { PanneauAffichageComponent } from './panneau-affichage/panneau-affichage.component';
import { GestionFournisseursComponent } from './accueil/gestion-fournisseurs/gestion-fournisseurs.component';
import { NouveauFournisseurComponent } from './accueil/gestion-fournisseurs/nouveau-fournisseur/nouveau-fournisseur.component';
import { NouveauProduitComponent } from './accueil/gestion-fournisseurs/nouveau-produit/nouveau-produit.component';
import { ModalMailComponent } from './accueil/gestion-fournisseurs/modal-mail/modal-mail.component';
import { GestionTraiteurComponent } from './accueil/gestion-traiteur/gestion-traiteur.component';
import { ListeProduitsComponent } from './accueil/gestion-traiteur/liste-produits/liste-produits.component';
import { ListeEtiquettesComponent } from './accueil/gestion-traiteur/liste-etiquettes/liste-etiquettes.component';
import { VitrineComponent } from './accueil/gestion-traiteur/vitrine/vitrine.component';
import { CahierComponent } from './accueil/gestion-traiteur/cahier/cahier.component';
import { NouveauProduitTraiteurComponent } from './accueil/gestion-traiteur/liste-produits/nouveau-produit-traiteur/nouveau-produit-traiteur.component';
import { NouvelleEtiquetteComponent } from './accueil/gestion-traiteur/nouvelle-etiquette/nouvelle-etiquette.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    AdministrationComponent,
    NouvelEmployeComponent,
    ColorPickerComponent,
    ModalColorPickerComponent,
    MonCalendrierComponent,
    NouvelEventComponent,
    GestionDesCalendriersComponent,
    GestionPanneauAffichageComponent,
    PanneauAffichageComponent,
    GestionFournisseursComponent,
    NouveauFournisseurComponent,
    NouveauProduitComponent,
    ModalMailComponent,
    GestionTraiteurComponent,
    ListeProduitsComponent,
    ListeEtiquettesComponent,
    VitrineComponent,
    CahierComponent,
    NouveauProduitTraiteurComponent,
    NouvelleEtiquetteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbTooltipModule,
    NouisliderModule,
    JwBootstrapSwitchNg2Module,
    CommonModule
  ],
  providers: [DatePipe, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
