import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseFournisseurComponent } from './reponse-fournisseur.component';

describe('ReponseFournisseurComponent', () => {
  let component: ReponseFournisseurComponent;
  let fixture: ComponentFixture<ReponseFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponseFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
