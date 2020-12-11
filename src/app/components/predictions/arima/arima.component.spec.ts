import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArimaComponent } from './arima.component';

describe('ArimaComponent', () => {
  let component: ArimaComponent;
  let fixture: ComponentFixture<ArimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
