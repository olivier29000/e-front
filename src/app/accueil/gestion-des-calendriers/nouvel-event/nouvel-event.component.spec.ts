import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEventComponent } from './nouvel-event.component';

describe('NouvelEventComponent', () => {
  let component: NouvelEventComponent;
  let fixture: ComponentFixture<NouvelEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
