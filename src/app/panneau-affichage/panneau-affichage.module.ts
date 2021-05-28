import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PanneauAffichageRoutingModule } from './panneau-affichage-routing.module';
import { PanneauAffichageComponent } from './panneau-affichage.component';


@NgModule({
  imports: [
    CommonModule,
    PanneauAffichageRoutingModule,
    NgbModule
  ],
  exports: [
    PanneauAffichageComponent
  ],
  declarations: [
    PanneauAffichageComponent
  ],
  providers: [
  ],
})
export class PanneauAffichageModule { }
