import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil.component';
import { GestionEmployesComponent } from './gestion-employes/gestion-employes.component';
import { ModalEvenementComponent } from './gestion-employes/modal-evenement/modal-evenement.component';
import { DatePipe } from '@angular/common';
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { LbdChartComponent } from './gestion-employes/lbd-chart/lbd-chart.component';
import { FormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ModalColorPickerComponent } from './color-picker/modal-color-picker/modal-color-picker.component';
import { NouvelEventComponent } from './gestion-des-calendriers/nouvel-event/nouvel-event.component';
@NgModule({
  imports: [
    CommonModule,
    AccueilRoutingModule,
    NgbModule,
    FormsModule,
    JwBootstrapSwitchNg2Module
  ],
  exports: [
    AccueilComponent
  ],
  declarations: [
    AccueilComponent,
    GestionEmployesComponent,
    ModalEvenementComponent,
    LbdChartComponent,
    ColorPickerComponent,
    ModalColorPickerComponent,
    NouvelEventComponent
    
  ],
  providers: [
    DatePipe
  ],
})
export class AccueilModule { }
