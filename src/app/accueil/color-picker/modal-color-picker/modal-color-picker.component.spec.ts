import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColorPickerComponent } from './modal-color-picker.component';

describe('ModalColorPickerComponent', () => {
  let component: ModalColorPickerComponent;
  let fixture: ComponentFixture<ModalColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
