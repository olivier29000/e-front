import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesCalendriersComponent } from './gestion-des-calendriers.component';

describe('GestionDesCalendriersComponent', () => {
  let component: GestionDesCalendriersComponent;
  let fixture: ComponentFixture<GestionDesCalendriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDesCalendriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesCalendriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
