import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleNoteContactRepertoireComponent } from './nouvelle-note-contact-repertoire.component';

describe('NouvelleNoteContactRepertoireComponent', () => {
  let component: NouvelleNoteContactRepertoireComponent;
  let fixture: ComponentFixture<NouvelleNoteContactRepertoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleNoteContactRepertoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleNoteContactRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
