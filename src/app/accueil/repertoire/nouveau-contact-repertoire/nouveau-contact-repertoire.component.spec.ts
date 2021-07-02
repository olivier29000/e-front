import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauContactRepertoireComponent } from './nouveau-contact-repertoire.component';

describe('NouveauContactRepertoireComponent', () => {
  let component: NouveauContactRepertoireComponent;
  let fixture: ComponentFixture<NouveauContactRepertoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauContactRepertoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauContactRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
