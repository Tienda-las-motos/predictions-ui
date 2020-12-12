import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaPopupComponent } from './alerta-popup.component';

describe('AlertaPopupComponent', () => {
  let component: AlertaPopupComponent;
  let fixture: ComponentFixture<AlertaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
