import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetteComponent } from './etiquette.component';

describe('EtiquetteComponent', () => {
  let component: EtiquetteComponent;
  let fixture: ComponentFixture<EtiquetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
