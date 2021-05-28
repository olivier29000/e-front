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
    PanneauAffichageComponent
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
